import { Request, Response } from 'express';
import { SupportCenter } from '../models/SupportCenter';
import { User } from '../models/User';

export const getConnectedSupportCenter = async (req: Request, res: Response) => {
    try {
        // Get connected user
        const user = await User.findById(req.body.user.id);

        const supportCenter = await SupportCenter.findOne({ user: user });
        res.status(200).json({ supportCenter: supportCenter});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting connected support center' });
    }
}

export const getSupportCenters = async (req: Request, res: Response) => {
    try {
        const supportCenters = await SupportCenter.find()
                .populate('location')
                .populate('service')
                .populate('location')
                .populate('user')
                .populate('incidents');
        res.status(200).json({ supportCenters: supportCenters });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting support centers with their locations' });
    }
}