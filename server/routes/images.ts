import express, { NextFunction, Request, Response } from 'express';
const images = express.Router();
import prisma from '../prisma';
import { parse } from 'dotenv';

images.post('/upload', async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body as unknown as { url: string }

    if (!url) return next({ message: "Missing url" });

    try {
        const image = await prisma.image.create({
            data: {
                url: url
            }
        });

        res.send({ ok: true, image: image.id });
    }

    catch (err) {
        next({ message: "Unkown error occured"});
    }
});

images.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    const { id, last } = req.query as unknown as { id: string, last: string };

    if (!id && !last) return next({ message: "Missing fields" });

    try {
        if (id) {
            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
    
            if (!image) return next({ message: "Image not found" });
    
            res.send({ ok: true, image: image });
        }

        else if (last) {
            const images = await prisma.image.findMany({
                take: parseInt(last),
                orderBy: {
                    id: "desc"
                }
            });

            if (!images || images.length === 0) return next({ message: "No images" });

            res.send({ ok: true, images: images });
        }
    }

    catch (err) {
        next({ message: "Unkown error occured"});
    }
});

images.get("/delete", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query as unknown as { id: string };

    if (!id) return next({ message: "Missing id" });

    try {
        await prisma.image.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.send({ ok: true });
    }

    catch (err) {
        next({ message: "Unkown error occured"});
    }
});


module.exports = images;