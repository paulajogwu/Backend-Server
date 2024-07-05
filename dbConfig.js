const admin = require("firebase-admin");

const serviceAccount = require("./esetech-435b7-firebase-adminsdk-1mv9g-224cdc5b62.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
