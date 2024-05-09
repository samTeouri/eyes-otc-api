import * as express from 'express';
import { body } from "express-validator";
import * as incidentController from '../controllers/IncidentController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';

export const incidentRouter = express.Router();

// Report an incident
incidentRouter.post('/report',
    [
        body('description').exists()
    ],
    authVerifyToken,
    incidentController.reportIncident,
);

// Handle an incident
incidentRouter.post('/handle/:incidentId',
    [
        body('isHandled').exists()
    ],
    authVerifyToken,
    incidentController.handleIncident,
);

// Handle an incident
incidentRouter.post('/update/:incidentId',
    authVerifyToken,
    incidentController.updateIncident,
);

// Get incidents associated to supportCenter
incidentRouter.get('/index/supportCenter/:supportCenterId',
    authVerifyToken,
    incidentController.getSupportCenterIncidents,
);

// Change incident handling status
incidentRouter.post('/handleStatus/:incidentId',
    authVerifyToken,
    incidentController.notificationState,
);

// Get incidents reported by user
incidentRouter.get('/index/user/:userId',
    authVerifyToken,
    incidentController.getUserIncidents,
);