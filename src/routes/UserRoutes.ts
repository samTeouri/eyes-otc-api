import * as express from 'express';
import * as userController from '../controllers/UserController';
import { authVerifyToken } from '../middlewares/AuthMiddleware';
import { body } from 'express-validator';

export const userRouter = express.Router();

// Get user infos
userRouter.get('/infos/:userId',
    authVerifyToken,
    userController.getUserInfo,
);

// Change user password
userRouter.post('/changePassword',
    [
        body('newPassword').exists().isAlphanumeric(),
        body('oldPassword').exists().isAlphanumeric(),
    ],
    authVerifyToken,
    userController.changePassword,
);