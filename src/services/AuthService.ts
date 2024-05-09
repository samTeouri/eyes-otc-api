import { IUser, User } from "../models/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RequestValidationService } from "./RequestValidationService";
import { Request, Response } from "express";

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

    userLogging = async (user: IUser, password: string,res: Response): Promise<Response> => {
        // User with given identifier exist
        if (user) {
            // Check if given password is correct
            if (await this.checkPassword(user, password)) return res.status(401).json({ error: 'Password is incorrect' });

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

    }
}
