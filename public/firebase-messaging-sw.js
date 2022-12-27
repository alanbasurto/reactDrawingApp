// import { getMessaging } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";
// import { app } from "../src/firebase/firebase-config";

// const messaging = getMessaging(app);

// onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };

//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCewOQrXn9L8nTNi4wHPUPK97za23vuX6g",
    authDomain: "drawingapp-11.firebaseapp.com",
    projectId: "drawingapp-11",
    storageBucket: "drawingapp-11.appspot.com",
    messagingSenderId: "312972780316",
    appId: "1:312972780316:web:aa523fbac22269d6a6d0d9",
    measurementId: "G-6CGP642ZSV"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //   body: 'Background Message body.',
    //   icon: '/firebase-logo.png'
    // };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });