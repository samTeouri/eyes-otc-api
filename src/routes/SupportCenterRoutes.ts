import * as express from 'express';
import * as supportCenterController from '../controllers/SupportCenterController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';

export const supportCenterRouter = express.Router();

// Get incidents associated to supportCenter
supportCenterRouter.get('/connected/',
    authVerifyToken,
    supportCenterController.getConnectedSupportCenter,
);