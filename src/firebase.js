import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUBy_ynhPHHnTUmOMfQlgQ6hd1LL4xHPA",
  authDomain: "akiv60-2db6a.firebaseapp.com",
  projectId: "akiv60-2db6a",
  storageBucket: "akiv60-2db6a.firebasestorage.app",
  messagingSenderId: "1011614744557",
  appId: "1:1011614744557:web:71af1eaef8eb250292f1e4",
  measurementId: "G-Y4NKDWG17N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
