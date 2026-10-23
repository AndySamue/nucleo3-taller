// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO5ULncH1Gy6bGi_1b8lurXpyTQcnm71g",
  authDomain: "taller3-75222.firebaseapp.com",
  databaseURL: "https://taller3-75222-default-rtdb.firebaseio.com",
  projectId: "taller3-75222",
  storageBucket: "taller3-75222.firebasestorage.app",
  messagingSenderId: "922467578154",
  appId: "1:922467578154:web:937b9b409e9cba1c50ee53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);