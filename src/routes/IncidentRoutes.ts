import * as express from 'express';
import { body } from "express-validator";
import * as incidentController from '../controllers/IncidentController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';
import { uploadFile } from '../middlewares/FilesUploadMiddleware';

export const incidentRouter = express.Router();

// Report an incident
incidentRouter.post('/report',
    uploadFile.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
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

// Update an incident
incidentRouter.post('/update/:incidentId',
    authVerifyToken,
    incidentController.updateIncident,
);

// Get incident details
incidentRouter.get('/:incidentId',
    authVerifyToken,
    incidentController.getIncidentDetails,
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