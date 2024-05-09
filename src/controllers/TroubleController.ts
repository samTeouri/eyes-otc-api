import { Request, Response } from 'express';
import { Trouble } from '../models/Trouble';

export const getTroubles = async (req: Request, res: Response) => {
    try {
        const troubles = await Trouble.find();
        res.status(200).json({ troubles: troubles});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting troubles' });
    }
}