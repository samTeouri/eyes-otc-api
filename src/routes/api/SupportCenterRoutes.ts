import * as express from 'express';
import * as supportCenterController from '../../controllers/api/SupportCenterController';
import { authVerifyApiToken } from '../../middlewares/AuthMiddlewares';

export const supportCenterRouter = express.Router();

// Get incidents associated to supportCenter
supportCenterRouter.get('/connected/',
    authVerifyApiToken,
    supportCenterController.getConnectedSupportCenter,
);

// Get all support centers
supportCenterRouter.get('/index/',
    authVerifyApiToken,
    supportCenterController.getSupportCenters,
);
