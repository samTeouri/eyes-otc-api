import * as express from 'express';
import * as troubleController from '../controllers/TroubleController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';

export const troubleRouter = express.Router();

// Get incidents associated to supportCenter
troubleRouter.get('/index/',
    authVerifyToken,
    troubleController.getTroubles,
);