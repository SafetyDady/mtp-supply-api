const admin = require('firebase-admin');

const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
