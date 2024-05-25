import * as express from 'express';
import * as incidentController from '../../controllers/api/IncidentController';
import { authVerifyApiToken } from '../../middlewares/AuthMiddlewares';
import { uploadFile } from '../../middlewares/FilesUploadMiddleware';

export const incidentApiRouter = express.Router();

// Report an incident
incidentApiRouter.post('/report',
    uploadFile.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    authVerifyApiToken,
    incidentController.reportIncident,
);

// Update an incident
incidentApiRouter.post('/update/:incidentId',
    uploadFile.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    authVerifyApiToken,
    incidentController.updateIncident,
);

// Get incident details
incidentApiRouter.get('/:incidentId',
    authVerifyApiToken,
    incidentController.getIncidentDetails,
);

// Get incidents associated to supportCenter
incidentApiRouter.get('/index/supportCenter/:supportCenterId',
    authVerifyApiToken,
    incidentController.getSupportCenterIncidents,
);

// Change incident handling status
incidentApiRouter.post('/handleStatus/:incidentId',
    authVerifyApiToken,
    incidentController.notificationState,
);

// Get incidents reported by user
incidentApiRouter.get('/index/user/:userId',
    authVerifyApiToken,
    incidentController.getUserIncidents,
);