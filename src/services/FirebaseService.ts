import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string))
});
