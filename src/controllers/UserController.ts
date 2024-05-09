import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        // Find user by ID
        const user = await User.findById(req.params.userId);
        if (user) return res.status(200).json({ user: user});
        return res.status(404).json({ message: 'User not found' });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting user info' });
    }
}