import express, { NextFunction, Request, Response } from 'express';
const posts = express.Router();
import prisma from '../prisma';
import { Post } from '../types';

posts.post('/publish', async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, content, image, description  } = req.body as unknown as { title: string, author: string, content: Post["content"], image: string, description: string };

    if (!title || !author || !content || !description || !image) res.status(400).send({ error: "Missing some fields" })

    try {
        if (content.length < 0) res.status(400).send({ error: "No content?" })

        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: author,
                image: image,
                description: description
            }
        })
    
        res.send({ ok: true, id: post.id })
    } catch (err: any) {
        // throw new Error(err)
        next({ message: err.message })
    }
})

posts.get('/delete', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query as unknown as { id: string };

    if (!id) res.status(400).send({ error: "No id" })

    try {
        await prisma.post.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.send({ ok: true })
    } catch (err) {
        next({ message: "Unknown error occured" })
    }
})

posts.get("/get", async (req: Request, res: Response, next: NextFunction) => {
    const { id, last } = req.query as unknown as { id: string, last: string };

    if (!id && !last) res.status(400).send({ error: "No id or last" })

    if (id) {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!post) res.status(404).send({ error: "Post not found" })
                res.send({ post: post })
        } catch (err) {
            next({ message: "Unknown error occured" })
        }
        
    }

    if (last) {
        try {
            const posts = await prisma.post.findMany({
                take: (parseInt(last) === -1) ? -1 : parseInt(last),
                orderBy: {
                    createdAt: "desc"
                }
            })
    
            res.send({ posts: posts })
        } catch (err) {
            next({ message: "Unknown error occured" })
        }
    }
})

posts.get("/view", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query as unknown as { id: string };

    if (!id) res.status(400).send({ error: "No id" })

    try {
        const post = await prisma.post.update({
            where: {
                id: parseInt(id)
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })

        res.send({ ok: true, views: post.views })
    } catch (err) {
        next({ message: "Unknown error occured" })
    }
})

module.exports = posts;