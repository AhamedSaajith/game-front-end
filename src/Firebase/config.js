import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNuFeLPCEv-6XpEC5IGTHOWD50aA9Z8oU",
  authDomain: "bananagame-39478.firebaseapp.com",
  projectId: "bananagame-39478",
  storageBucket: "bananagame-39478.appspot.com",
  messagingSenderId: "189887582799",
  appId: "1:189887582799:web:49cf6055f3f613ee62503a",
  measurementId: "G-YKCYP2NKGK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
