import { Response } from "express";
import { IUser } from "../models/User";
import { IRole } from "../models/Role";

export class RoleService {
    checkRole = async (user: IUser, role: IRole, res: Response) => {
        if (!(await user.populate('roles')).roles.includes(role)) return res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
}