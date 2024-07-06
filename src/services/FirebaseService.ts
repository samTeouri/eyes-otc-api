import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';


const serviceAccountKey = require('../serviceAccountKey.json')

dotenv.config();

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const messaging: admin.messaging.Messaging = admin.messaging(app);

export class FirebaseCloudMessagingService {
    
    sendNotification = async (deviceToken: string, notification: admin.messaging.Notification) => {
        const message: admin.messaging.Message = {
            notification: notification,
            token: deviceToken
        };

        return await messaging.send(message)
            .then((reponse: string) => {
                console.log(`Notification envoyée : ${reponse}`);
                
            })
            .catch((reason: any) => {
                console.log(`Error sending notification : ${reason}`);
            });

    }

    sendNotifications = async (devicesTokens: string[], notification: admin.messaging.Notification) => {
        const message: admin.messaging.MulticastMessage = {
            notification: notification,
            tokens: devicesTokens
        };

        return await messaging.sendMulticast(message)
            .then((reponse: BatchResponse) => {
                console.log(`Notifications envoyées : ${reponse}`);                
            })
            .catch((reason: any) => {
                console.log(`Error sending notifications : ${reason}`);
            });

    }
}