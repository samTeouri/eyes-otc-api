// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFV9xO6zG0_h1QdHr-5pJGz3B_nNULqHE",
    authDomain: "edu-nyui.firebaseapp.com",
    projectId: "edu-nyui",
    storageBucket: "edu-nyui.appspot.com",
    messagingSenderId: "588863113251",
    appId: "1:588863113251:web:cfa75e74dd7914ea650996",
    measurementId: "G-7XSNRP23TX",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', event => {
   console.log(event)
});