import express, { NextFunction, Request, Response } from 'express';
const polls = express.Router();
import prisma from '../prisma';

polls.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    const { title, options } = req.body as unknown as { title: string, options: Poll["options"] };

    if (!title || !options) return next({ message: "Missing some fields" });

    try {
        const poll = await prisma.poll.create({
            data: {
                title: title,
                options: options
            }
        });

        res.send({ ok: true, poll: poll.id });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})  

polls.get('/vote', async (req: Request, res: Response, next: NextFunction) => {
    const { id, index } = req.query as unknown as { id: string, index: string };

    try {
        const poll = await prisma.poll.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!poll || !poll.options) return next({ message: "Poll not found" });

        const options = (Object.assign({}, poll.options)) as Poll["options"];

        options[Object.keys(options)[parseInt(index)]]++;

        const newPoll = await prisma.poll.update({
            where: {
                id: parseInt(id)
            },
            data: {
                options: options
            }
        })

        res.send({ ok: true, poll: newPoll });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})

polls.get("/unvote", async (req: Request, res: Response, next: NextFunction) => {
    const { id, index } = req.query as unknown as { id: string, index: string };

    try {
        const poll = await prisma.poll.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!poll || !poll.options) return next({ message: "Poll not found" });

        const options = (Object.assign({}, poll.options)) as Poll["options"];

        options[Object.keys(options)[parseInt(index)]]--;

        const newPoll = await prisma.poll.update({
            where: {
                id: parseInt(id)
            },
            data: {
                options: options
            }
        })

        res.send({ ok: true, poll: newPoll });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})

polls.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query as unknown as { id: string };

    try {
        const poll = await prisma.poll.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!poll) return next({ message: "Poll not found" });

        res.send({ ok: true, poll: poll });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})

polls.get("/delete", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query as unknown as { id: string };

    try {
        await prisma.poll.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.send({ ok: true });
    } catch (err) {
        next({ message: "Unkown error occured" });
    }
})

interface Poll {
    id: number,
    title: string,
    options: Record<string, number>
  }


module.exports = polls;