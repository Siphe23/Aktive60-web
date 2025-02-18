import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const authService = {
  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      await this.verifyTokenWithBackend(token);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  },

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      await this.verifyTokenWithBackend(token);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  },

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      await this.verifyTokenWithBackend(token);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  },

  async verifyTokenWithBackend(token) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Token verification failed");
    }
    return response.json();
  },

  handleAuthError(error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return new Error("Email is already registered");
      case "auth/invalid-email":
        return new Error("Invalid email address");
      case "auth/operation-not-allowed":
        return new Error("Operation not allowed");
      case "auth/weak-password":
        return new Error("Password is too weak");
      case "auth/user-disabled":
        return new Error("User account has been disabled");
      case "auth/user-not-found":
        return new Error("User not found");
      case "auth/wrong-password":
        return new Error("Invalid password");
      default:
        return new Error("Authentication failed");
    }
  },
};
