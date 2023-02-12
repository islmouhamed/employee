const { initializeApp, cert } = require ("firebase-admin/app");
const { getAuth } = require ("firebase-admin/auth");

const serviceAccountKey = require ("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

module.exports= auth = getAuth(app)
