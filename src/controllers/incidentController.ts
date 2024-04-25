import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const reportIncident = async (req: Request, res: Response) => {
    // Validate form values and manage errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get form values from body
    const { state, description, picture, video } = req.body;
}