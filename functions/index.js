const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer"); // for sending emails

admin.initializeApp();

const db = admin.firestore();

// Create a transporter object using SMTP transport (you can use your email provider's SMTP settings)
const transporter = nodemailer.createTransport({
  service: "gmail", // or other email service
  auth: {
    user: "YOUR_EMAIL@gmail.com", // Your email
    pass: "YOUR_EMAIL_PASSWORD", // Your email password or app-specific password
  },
});

// Generate a recovery code
const generateRecoveryCode = () => {
  return Math.random().toString(36).substring(2, 15); // Generate a random code
};

// Firebase function to handle the password reset request
exports.requestPasswordReset = functions.https.onCall(async (data, context) => {
  const {email} = data;

  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "Email is required");
  }

  try {
    // Check if the user exists in Firestore (or Firebase Authentication)
    const userRef = await admin.auth().getUserByEmail(email);
    const uid = userRef.uid;

    // Generate a recovery code
    const recoveryCode = generateRecoveryCode();

    // Store the recovery code in Firestore with an expiration time (e.g., 1 hour)
    const expiration = Date.now() + 3600000; // 1 hour expiration time
    await db.collection("passwordRecoveryCodes").doc(uid).set({
      code: recoveryCode,
      expiration: expiration,
    });

    // Send the recovery code to the user’s email
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


    return {message: "Recovery code sent to email"};
  } catch (error) {
    console.error("Error during password reset:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

// Firebase function to validate recovery code and reset the password
exports.validateRecoveryCode = functions.https.onCall(async (data, context) => {
  const {uid, recoveryCode, newPassword} = data;

  if (!recoveryCode || !newPassword) {
    throw new functions.https.HttpsError("invalid-argument", "Recovery code and new password are required");
  }

  try {
    // Check if the recovery code exists in Firestore
    const codeDoc = await db.collection("passwordRecoveryCodes").doc(uid).get();

    if (!codeDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Recovery code not found");
    }

    const codeData = codeDoc.data();
    const currentTime = Date.now();

    // Check if the recovery code has expired
    if (currentTime > codeData.expiration) {
      throw new functions.https.HttpsError("failed-precondition", "Recovery code has expired");
    }

    // Check if the recovery code matches
    if (recoveryCode !== codeData.code) {
      throw new functions.https.HttpsError("permission-denied", "Invalid recovery code");
    }

    // Reset the user's password
    await admin.auth().updateUser(uid, {
      password: newPassword,
    });

    // Optionally, remove the recovery code from Firestore after it’s used
    await db.collection("passwordRecoveryCodes").doc(uid).delete();

    return {message: "Password reset successful"};
  } catch (error) {
    console.error("Error validating recovery code:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
