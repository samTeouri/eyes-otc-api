import ejs from "ejs";
import { Request, Response } from "express"
import path from "path";

export const getDashboard = async (req: Request, res: Response) => {
    res.render('pages/main', {
        content: await ejs.renderFile(path.join(__dirname, '../../../views/pages', 'dashboard.ejs'))
    });
}