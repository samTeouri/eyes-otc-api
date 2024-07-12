import { Request, Response } from 'express';
import { User } from '../../models/User';

export const setFcmToken = async (req: Request, res: Response) => {
    try {
        if(req.session.user) {
            const user = await User.findById(req.session.user._id);
            if (user) {
                user.fcmToken = req.body.fcmToken;
                await user.save();
            }
            res.status(200).json({
                message: "Device token stored on the server-side successfully !",
                user: req.session.user
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while storing token on the server-side !' });
    }
}