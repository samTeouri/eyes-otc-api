import * as express from 'express';
import * as troubleController from '../../controllers/api/TroubleController';
import { authVerifyApiToken } from '../../middlewares/AuthMiddlewares';

export const troubleRouter = express.Router();

// Get incidents associated to supportCenter
troubleRouter.get('/index/',
    authVerifyApiToken,
    troubleController.getTroubles,
);