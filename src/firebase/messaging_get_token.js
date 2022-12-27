import { app } from "./firebase-config";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const messaging = getMessaging(app);

const db = getFirestore(app);
// Saves the messaging device token to Cloud Firestore.
export const saveMessagingDeviceToken = async (user) => {
  getToken(messaging, { vapidKey: 'BDWHdub8GjfBJriNLo4ja45M22Qovpt5heT-pVebcvluf6hT1pc6XGzctwe-LFky446Dsu1tAyXjrPy_DOXBFY8' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // console.log('Got FCM device token:', currentToken);
        // // Saving the Device Token to Cloud Firestore.
        const tokenRef = doc(db, 'fcmTokens', currentToken);
        setDoc(tokenRef, { uid: user.uid }).then( () => {});
        onMessage(messaging, (payload) => {
          console.log('Message received. from onMessage ', payload);

          // console.log(payload.notification.body)
          // alert(payload.notification.body)
          // ...
        });
        // // This will fire when a message is received while the app is in the foreground.
        // // When the app is in the background, firebase-messaging-sw.js will receive the message instead.        
        // onMessage(messaging, (message) => {
        //   console.log(
        //     'New foreground notification from Firebase Messaging!',
        //     message.notification
        //   );
        //   console.log("si llego una noti")
        // });
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
  
    // try {
    //   const currentToken = await getToken(messaging,{vapidKey: "BDWHdub8GjfBJriNLo4ja45M22Qovpt5heT-pVebcvluf6hT1pc6XGzctwe-LFky446Dsu1tAyXjrPy_DOXBFY8"});
    //   if (currentToken) {
    //     console.log('Got FCM device token:', currentToken);
    //     // Saving the Device Token to Cloud Firestore.
    //     const tokenRef = doc(db, 'fcmTokens', currentToken);
    //     await setDoc(tokenRef, { uid: user.uid });
  
    //     // This will fire when a message is received while the app is in the foreground.
    //     // When the app is in the background, firebase-messaging-sw.js will receive the message instead.        
    //     onMessage(messaging, (message) => {
    //       console.log(
    //         'New foreground notification from Firebase Messaging!',
    //         message.notification
    //       );
    //       console.log("si llego una noti")
    //     });
    //   } else {
    //     // Need to request permissions to show notifications.
    //     requestNotificationsPermissions();
    //   }
    // } catch(error) {
    //   console.error('Unable to get messaging token.', error);
    // };
}

// Requests permissions to show notifications.
export const requestNotificationsPermissions = async (user) => {
    // console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // console.log('Notification permission granted.');
      // Notification permission granted.
      await saveMessagingDeviceToken(user);
    } else {
      console.log('Unable to get permission to notify.');
    }
}