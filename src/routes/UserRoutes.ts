import * as express from 'express';
import * as userController from '../controllers/UserController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';

export const userRouter = express.Router();

// Get user infos
userRouter.get('/infos/:userId',
    authVerifyToken,
    userController.getUserInfo,
);