import * as express from 'express';
import { body } from "express-validator";
import * as incidentController from '../controllers/IncidentController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';

export const incidentRouter = express.Router();

// Report an incident
incidentRouter.post('/report',
    [
        body('description').isEmpty()
    ],
    authVerifyToken,
    incidentController.reportIncident,
);

// Handle an incident
incidentRouter.post('/handle/:incidentId',
    [
        body('description').isEmpty()
    ],
    authVerifyToken,
    incidentController.handleIncident,
);

// Handle an incident
incidentRouter.post('/index/:supportCenterId',
    authVerifyToken,
    incidentController.getSupportCenterIncidents,
);