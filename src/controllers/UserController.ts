import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { RequestValidationService } from '../services/RequestValidationService';
import { AuthService } from '../services/AuthService';

const requestValidationService = new RequestValidationService();
const authService = new AuthService();

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        // Find user by ID
        const user = await User.findById(req.params.userId).populate('incidents').populate('roles');
        if (user) return res.status(200).json({ user: user });
        return res.status(404).json({ message: 'User not found' });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting user infos' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { lastName, firstName, email, phone, address } = req.body;

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        if (user) {
            if (lastName) user.lastName = lastName;
            if (firstName) user.firstName = firstName;
            if (email) user.email = email;
            if (phone) user.phone = phone;
            if (address) user.address = address;
            await user.save();
            return res.status(200).json({ message: 'User updated successfully' });
        }
        return res.status(404).json({ message: 'User not found' });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating user infos' });
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get form values from body
        const { newPassword, oldPassword } = req.body;

        // Find user by ID
        const user = await User.findById(req.body.user.id);
        if (user) {
            if (await authService.checkPassword(user, oldPassword)) {
                if (newPassword !== oldPassword) {
                    user.password = await bcrypt.hash(newPassword, 15);
                    await user.save();
                    return res.status(200).json({ message: 'Password changed succesfully' });
                }
                return res.status(400).json({ message: 'New password should not be the same as old password' });
            }
            return res.status(400).json({ message: 'Password provided is incorrect' });
        }
        return res.status(404).json({ message: 'User not found' });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while changing user password' });
    }
}