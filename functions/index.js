import { auth } from "firebase-admin";

const functions = require("firebase-functions");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

initializeApp();

const db = getFirestore();
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hola mundo!!!");
  // Create a document reference
  const docRef = db.collection('users').doc('mwbQhGssqoXHqrMmp3BDX4LNLLX2');

  // Update the timestamp field with the value from the server
  const res = await docRef.update({
    timestamp: FieldValue.serverTimestamp()
  });
});

//qqlnnrynkseeukal
const gmailEmail = "punkstar_10@hotmail.com";
const gmailPassword = "DigimonWorld25Hm";



export const testApiCallsWithNoLogicResquest = functions.https.onRequest(async (req,res) => {
  cors({origin:'*'})(req,res,async () => {
    try {
      const {uid} =req.body;
      const user = await auth().getUser(uid)
      res.status(200)
    } catch (e) {
      console.log(e)
    }
  })
})









const nodemailer = require('nodemailer');
const mailTransport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Drawing APP';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName);
});
// [END sendByeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <punkstar_10@hotmail.com> `,
    to: email,
  };
  functions.logger.info("function send Welcome after mailOp", { structuredData: true });
  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service. :)`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.log('New welcome email sent to:', email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <punkstar_10@hotmail.com> `,
    to: email,
  };
  functions.logger.info("function send bye", { structuredData: true });
  // The user unsubscribed to the newsletter.
  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account. :C`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.log('Account deletion confirmation email sent to:', email);
  return null;
}

