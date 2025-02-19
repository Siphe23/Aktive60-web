const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com", // Your email
    pass: "YOUR_EMAIL_PASSWORD",  // Your app password or email password
  },
});

// Generate a random recovery code
const generateRecoveryCode = () => {
  return Math.random().toString(36).substring(2, 15);  // Generate a random string
};

// Firebase function to handle password reset request
exports.requestPasswordReset = functions.https.onCall(async (data, context) => {
  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "Email is required");
  }

  try {
    // Check if user exists in Firebase Authentication
    const userRef = await admin.auth().getUserByEmail(email);
    const uid = userRef.uid;

    // Generate a recovery code
    const recoveryCode = generateRecoveryCode();

    // Store the recovery code in Firestore with expiration (1 hour)
    const expiration = Date.now() + 3600000; // 1 hour expiration
    await db.collection("passwordRecoveryCodes").doc(uid).set({
      code: recoveryCode,
      expiration: expiration,
    });

    // Send recovery code via email
    const mailOptions = {
      from: "YOUR_EMAIL@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Hello,

      Here is your recovery code to reset your password: ${recoveryCode}

      This code will expire in 1 hour.

      If you didn’t request a password reset, please ignore this email.

      Thanks,
      Your App Team`,
    };

    await transporter.sendMail(mailOptions);

    return { message: "Recovery code sent to email" };
  } catch (error) {
    console.error("Error during password reset:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
