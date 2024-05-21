import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import { IRole, Role } from '../../models/Role';
import { AuthService } from '../../services/AuthService';
import { RequestValidationService } from '../../services/RequestValidationService';
import { RoleService } from '../../services/RoleService';

const authService = new AuthService();
const roleService = new RoleService();
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
            // await Role.findOne({ name: 'citizen' })
            //     .then(async (role: IRole | null) => {
            //         if (role) {
            //             roleService.checkRole(user, role, res);
            //         }
            //     })
            //     .catch(async (reason: any) => {
            //         throw reason;
            //     })
            authService.userApiLogging(user, password, res);
        } else {
            res.status(404).json({ message: 'User with given identifier doesn\'t exists' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Login failed' });
    }
}

export const refreshAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.header('Refresh-Token');
    if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
        const decoded: any = jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY as string);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '2h' });

        return res.status(200).json({
            userId: decoded.id,
            _token: accessToken,
            _refreshToken: refreshToken
        });
    } catch (error) {
        return res.status(400).send('Invalid refresh token.');
    }
}