import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const authVerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization-Token');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};