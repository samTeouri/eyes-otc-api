import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const authVerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header('Authorization-Token');
    const refreshToken = req.header('Refresh-Token');

    if (!accessToken && !refreshToken) return res.status(401).json({ error: 'Access denied. No token provided' });
    console.log(refreshToken);
    
    try {
        const decoded = jwt.verify(accessToken as string, process.env.TOKEN_SECRET_KEY as string);
        req.body.user = decoded;
        next();
    } catch (error) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }

        try {
            const decoded: any = jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY as string);
            const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '1h' });
      
            return res.status(200).json({
                user: decoded.id,
                _token: accessToken,
                _refreshToken: refreshToken
            });
          } catch (error) {
            return res.status(400).send('Invalid Token.');
          }
    }
};