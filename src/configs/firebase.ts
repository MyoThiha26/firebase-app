// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy66J2EUsuPuMYSj1I7LsmU0_nqOvoMYU",
  authDomain: "social-media-app-9f5ea.firebaseapp.com",
  projectId: "social-media-app-9f5ea",
  storageBucket: "social-media-app-9f5ea.appspot.com",
  messagingSenderId: "779887937062",
  appId: "1:779887937062:web:64c317850979687ac748e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
