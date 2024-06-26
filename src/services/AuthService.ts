import { IUser, User } from "../models/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RequestValidationService } from "./RequestValidationService";
import { Request, Response } from "express";
import { ISupportCenter, SupportCenter } from "../models/SupportCenter";

const requestValidationService = new RequestValidationService();

export class AuthService {
    getUserByEmail = async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email: email })
            .then(async (user: IUser | null) => {
                return user
            })
            .catch(async (reason: any) => {
                throw reason;
            });
    }

    getUserByPhone = async (phone: number): Promise<IUser | null> => {
        return await User.findOne({ phone: phone })
            .then(async (user: IUser | null) => {
                return user
            })
            .catch(async (reason: any) => {
                throw reason;
            });
    }

    getUserByIdentifier = async (identifier: string | number): Promise<IUser | null> => {
        // Check if identifier is email
        if (typeof identifier === 'string') {
            return this.getUserByEmail(identifier);
        } else {
            // identifier is phone number
            return this.getUserByPhone(identifier);
        }
    }

    checkPassword = async (user: IUser, password: string): Promise<boolean> => {
        // Check if given password matches user password
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        return isPasswordMatching;
    }

    userApiLogging = async (user: IUser, password: string,res: Response): Promise<Response> => {
        // User with given identifier exist
        if (user) {
            // Check if given password is correct
            if (!(await this.checkPassword(user, password))) return res.status(401).json({ error: 'Password is incorrect' });

            // Token signature
            const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '2h' });

            // Refresh Token signature
            const refreshToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '7d' });

            return res.status(200).json({
                user: user,
                _token: accessToken,
                _refreshToken: refreshToken
            });
        } else {
            // User with given identifier doesn't exist
            return res.status(401).json({ error: 'Email or phone doesn\'t exist' });
        }

    }

    userWebLogging = async (user: IUser, password: string, req: Request): Promise<boolean> => {
        try {
            // Check if given password is correct
            if (!(await this.checkPassword(user, password))) {
                req.session.errorMessage = 'Mot de passe incorrect';
                return false
            };

            const supportCenter = await SupportCenter.findOne({ user: user });
            const session: any = req.session;
            session.isAuthenticated = true;
            session.user = user;
            session.supportCenter = supportCenter;

            return true;
        } catch (error) {
            console.log(`Error while login : ${error}`);
            return false;
        }
    }
}
