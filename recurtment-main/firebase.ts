import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ0tIMbwgjdz-r_p9Q79dBFVqpewYvsCw",
  authDomain: "cybershield-test.firebaseapp.com",
  projectId: "cybershield-test",
  storageBucket: "cybershield-test.firebasestorage.app",
  messagingSenderId: "853826599057",
  appId: "1:853826599057:web:bc15c29583e4e7f7bd2730",
  measurementId: "G-1F8BRHBVTX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
