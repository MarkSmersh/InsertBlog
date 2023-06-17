import express, { NextFunction, Request, Response } from 'express';
const polls = express.Router();
import prisma from '../prisma';
import { Poll } from '@prisma/client';

polls.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    const { title, options } = req.body as unknown as { title: string,  options: Poll["options"] };

    if (!title || !options) return next({ message: "Missing some fields" });

    try {
        const poll = await prisma.poll.create({
            data: {
                title: title,
                options: JSON.stringify(options)
            }
        });

        res.send({ ok: true, poll: poll.id });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})  

polls.post('/vote', async (req: Request, res: Response, next: NextFunction) => {
    const { id, option } = req.body as unknown as { id: string, option: string };

    try {
        await prisma.poll.update({
            where: {
                id: parseInt(id)
            },
            data: {
                options: {
                    increment: {
                        [option]: 1
                    }
                }
            }
        })

        res.send({ ok: true });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})