var admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
module.exports = { admin, db };
