import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/User";

export class RequestValidationService {
    // validate request using express-validator 
    validateRequest = async (req: Request, res: Response) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    // validate auth identifier
    validateIdentifier = async (value: string, field: string) => {
        const user = await User.findOne({ where: { [field]: value } });
        if (user) {
            return Promise.reject(`${field} already registered`);
        }
    }
}