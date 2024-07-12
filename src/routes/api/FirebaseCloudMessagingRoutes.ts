import * as express from 'express';
import * as firebaseCloudMessagingController from '../../controllers/api/FirebaseCloudMessagingController';

export const firebaseCloudMessagingRouter = express.Router();

// Get incidents associated to supportCenter
firebaseCloudMessagingRouter.post('/set-token/',
    firebaseCloudMessagingController.setFcmToken,
);