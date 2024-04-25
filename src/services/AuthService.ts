import { Op } from "sequelize";
import { User } from "../models/User";
import * as bcrypt from 'bcrypt';

export class AuthService {
    getUserByIdentifier = async (identifier: string | number): Promise<User | null> => {
        if (typeof identifier == 'string') {
            // Check if identifier is string then email
            const user = await User.findOne({ 
                where: {
                    [Op.or]: {
                        email: identifier,
                    }
                }
            });

            // If user with this phone exists return user
            if (user instanceof User) return user;
        } else {
            // identifier is not string then phone number
            const user = await User.findOne({ 
                where: {
                    [Op.or]: {
                        phone: identifier,
                    }
                }
            });

            // If user with this phone exists return user
            if (user instanceof User) return user;
        }
        // If user doesn't exist return null
        return null;
    }

    checkPassword = async (user: User, password: string): Promise<boolean> => {
        // Check if given password match user password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        // Return false if password is incorrect
        if (!passwordMatch) return false;
        
        // Return true if paswword is correct
        return true;
    }
}