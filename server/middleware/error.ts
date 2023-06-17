import { Request, Response, NextFunction  } from 'express'

export function MiddlewareError (err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).send({ error: err.message })
}