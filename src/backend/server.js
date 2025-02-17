const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Token verification endpoint
app.post('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ userId: req.user.uid, email: req.user.email });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});