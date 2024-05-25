import { handleIncident } from "../../controllers/web/IncidentController";
import { authVerifyWebToken } from "../../middlewares/AuthMiddlewares";
import * as express from 'express';

export const incidentWebRouter = express.Router();

// Incident Handling
incidentWebRouter.post('/handle/:incidentId', authVerifyWebToken, handleIncident);