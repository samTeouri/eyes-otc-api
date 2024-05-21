import * as express from 'express';
import * as userController from '../../controllers/api/UserController';
import { authVerifyApiToken } from '../../middlewares/AuthMiddlewares';
import { body } from 'express-validator';

export const userRouter = express.Router();

// Get all users
userRouter.get('/index',
    authVerifyApiToken,
    userController.getAllUsers,
);

// Get user infos
userRouter.get('/infos/:userId',
    authVerifyApiToken,
    userController.getUserInfo,
);

// Change user password
userRouter.post('/changePassword',
    [
        body('newPassword').exists().isAlphanumeric(),
        body('oldPassword').exists().isAlphanumeric(),
    ],
    authVerifyApiToken,
    userController.changePassword,
);

// Update user
userRouter.post('/update',
    [
        body('lastName').isString(),
        body('firstName').isString(),
        body('email').isEmail(),
        body('phone').isNumeric(),
        body('address').isString(),
    ],
    authVerifyApiToken,
    userController.updateUser,
);