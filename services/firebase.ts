import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: REPLACE THESE WITH YOUR REAL FIREBASE KEYS FROM CONSOLE.FIREBASE.GOOGLE.COM
const firebaseConfig = {
  apiKey: "AIzaSyD-PLACEHOLDER-KEY-FOR-V9-UPDATE",
  authDomain: "el-ghalaba-v9.firebaseapp.com",
  projectId: "el-ghalaba-v9",
  storageBucket: "el-ghalaba-v9.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    // For mobile web, signInWithRedirect is often better, but popup works for desktop/modern mobile
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    throw error;
  }
};