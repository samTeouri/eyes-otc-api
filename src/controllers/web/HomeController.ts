import { Request, Response } from "express"

export const getDashboard = async (req: Request, res: Response) => {
    res.render('pages/dashboard');
}