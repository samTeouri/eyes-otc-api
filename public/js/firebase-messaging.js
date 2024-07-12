import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCFV9xO6zG0_h1QdHr-5pJGz3B_nNULqHE",
    authDomain: "edu-nyui.firebaseapp.com",
    projectId: "edu-nyui",
    storageBucket: "edu-nyui.appspot.com",
    messagingSenderId: "588863113251",
    appId: "1:588863113251:web:cfa75e74dd7914ea650996",
    measurementId: "G-7XSNRP23TX",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if (Notification.permission == 'granted') {
    getToken(messaging, { vapidKey: env.FIREBASE_CLOUD_MESSAGING_PUBLIC_VAPID_KEY })
        .then((currentToken) => {
            if (currentToken) {
                // Envoyer le token au serveur pour l'enregistrer et l'utiliser pour envoyer des notifications
                axios.post('/api/fcm/set-token', {
                        fcmToken: currentToken,
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.warn('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.error('An error occurred while retrieving token. ', err);
        });
} else {
    Notification.requestPermission();
}
