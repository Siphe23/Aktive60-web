// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app);