import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Incident } from "../models/Incident";

export const reportIncident = async (req: Request, res: Response) => {
    // Get form values from body
    const { state, description, picture, video } = req.body;

    // Validate form values and manage errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}