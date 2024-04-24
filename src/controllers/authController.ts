import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
    try {
    const { firstName, lastName, email, phone, address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = await User.create(
    //     {
    //         id: firstName
    //     }
    // );
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    }
}