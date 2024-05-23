import * as express from 'express';
import * as incidentController from '../../controllers/api/IncidentController';
import { authVerifyApiToken } from '../../middlewares/AuthMiddlewares';
import { uploadFile } from '../../middlewares/FilesUploadMiddleware';

export const incidentRouter = express.Router();

// Report an incident
incidentRouter.post('/report',
    uploadFile.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    authVerifyApiToken,
    incidentController.reportIncident,
);

// Update an incident
incidentRouter.post('/update/:incidentId',
    authVerifyApiToken,
    incidentController.updateIncident,
);

// Get incident details
incidentRouter.get('/:incidentId',
    authVerifyApiToken,
    incidentController.getIncidentDetails,
);

// Get incidents associated to supportCenter
incidentRouter.get('/index/supportCenter/:supportCenterId',
    authVerifyApiToken,
    incidentController.getSupportCenterIncidents,
);

// Change incident handling status
incidentRouter.post('/handleStatus/:incidentId',
    authVerifyApiToken,
    incidentController.notificationState,
);

// Get incidents reported by user
incidentRouter.get('/index/user/:userId',
    authVerifyApiToken,
    incidentController.getUserIncidents,
);