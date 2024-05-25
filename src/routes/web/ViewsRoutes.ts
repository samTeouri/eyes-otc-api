import express, { Request, Response } from "express";
import { getDashboard, getIncidents } from "../../controllers/web/ViewsController";
import { authVerifyWebToken } from "../../middlewares/AuthMiddlewares";

export const viewsRoutes = express.Router();

// Redirect to dashboard
viewsRoutes.get('', (req: Request, res: Response) => {
    res.redirect('/dashboard');
});

// Show dashboard route
viewsRoutes.get('/dashboard', authVerifyWebToken, getDashboard);

// Show dashboard route
viewsRoutes.get('/incidents/', authVerifyWebToken, getIncidents);

// Show profile