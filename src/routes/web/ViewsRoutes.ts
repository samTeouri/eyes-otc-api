import express from "express";
import { getDashboard, getIncidents } from "../../controllers/web/ViewsController";
import { authVerifyWebToken } from "../../middlewares/AuthMiddlewares";

export const viewsRoutes = express.Router();

// Show dashboard route
viewsRoutes.get('/dashboard', authVerifyWebToken, getDashboard);

// Show dashboard route
viewsRoutes.get('/incidents/', authVerifyWebToken, getIncidents);
