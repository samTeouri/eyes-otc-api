import { IUser, User } from "../models/User";
import * as bcrypt from 'bcrypt';

export class AuthService {
    getUserByIdentifier = async (identifier: string | number): Promise<IUser | null> => {
        try {
            // Check if identifier is email
            if (typeof identifier === 'string') {
                const user = await User.findOne({ email: identifier });
                return user;
            } else {
                // Check if identifier is phone number
                const user = await User.findOne({ phone: identifier });
                return user;
            }
        } catch (error) {
            console.log("Error while finding user by identifier:", error);
            return null;
        }
    }

    checkPassword = async (user: IUser, password: string): Promise<boolean> => {
        try {
            // Check if given password matches user password
            const passwordMatch = await bcrypt.compare(password, user.password);
            return passwordMatch;
        } catch (error) {
            console.log("Error while checking password:", error);
            return false;
        }
    }
}
