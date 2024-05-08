import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/User';
import { IRole, Role } from '../models/Role';
import { AuthService } from '../services/AuthService';
import { RequestValidationService } from '../services/RequestValidationService';

const authService = new AuthService();
const requestValidationService = new RequestValidationService();

// Citizen registration
export const citizenRegister = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get user register form values from body
        const { firstName, lastName, email, phone, address, password } = req.body;

        // Create an instance of user
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            password: await bcrypt.hash(password, 15),
        });

        // Store user in database
        await user.save();

        // Set user citizen role
        const citizenRole = await Role.findOne({ name: 'citizen' });
        if (citizenRole) {
            user.roles.push(citizenRole);
            await user.save();
        }

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Registration failed' });
    }
}

// Admin registration
export const adminRegister = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get user register form values from body
        const { firstName, lastName, email, address, password } = req.body;

        // Create an instance of user
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            password: await bcrypt.hash(password, 15),
        });

        // Store user in database
        await user.save();

        // Set user admin role
        const adminRole = await Role.findOne({ name: 'admin' });
        if (adminRole) {
            user.roles.push(adminRole);
            await user.save();
        }

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Registration failed' });
    }
}

// Citizen login
export const citizenLogin = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get user register form values from body
        const { identifier, password } = req.body;

        // Get user instance using given identifier
        const user = await authService.getUserByIdentifier(identifier);

        // User with given identifier exist
        if (user) {
            // Check if given password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Password is incorrect' });
            }

            // Token signature
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY as string);

            return res.status(200).json({
                user: user,
                _token: token,
            });
        } else {
            // User with given identifier doesn't exist
            return res.status(401).json({ error: 'Email or phone doesn\'t exist' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Login failed' });
    }
}

// Admin login
export const adminLogin = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get user register form values from body
        const { identifier, password } = req.body;

        // Get user instance using given identifier
        const user = await authService.getUserByIdentifier(identifier);

        // User with given identifier exist
        if (user) {
            // Check if given password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Password is incorrect' });
            }

            // Token signature
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY as string);

            return res.status(200).json({
                user: user,
                _token: token,
            });
        } else {
            // User with given identifier doesn't exist
            return res.status(401).json({ error: 'Email or phone doesn\'t exist' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Login failed' });
    }
}