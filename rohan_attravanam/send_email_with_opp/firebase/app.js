const admin = require("firebase-admin");
const serviceAccount = require("../api_key.json");
const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;
