import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUBy_ynhPHHnTUmOMfQlgQ6hd1LL4xHPA",
  authDomain: "akiv60-2db6a.firebaseapp.com",
  databaseURL: "https://akiv60-2db6a-default-rtdb.firebaseio.com",
  projectId: "akiv60-2db6a",
  storageBucket: "akiv60-2db6a.firebasestorage.app",
  messagingSenderId: "1011614744557",
  appId: "1:1011614744557:web:71af1eaef8eb250292f1e4",
  measurementId: "G-Y4NKDWG17N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export { onAuthStateChanged };  // Exporting the function directly
export const db = getFirestore(app);
export const realTimeDB = getDatabase(app);
