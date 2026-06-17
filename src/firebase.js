import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8nXQtHSeHILJwQ6Oc9qBF3qVwwQf_wIQ",
  authDomain: "crochetloops-eb4ea.firebaseapp.com",
  projectId: "crochetloops-eb4ea",
  storageBucket: "crochetloops-eb4ea.firebasestorage.app",
  messagingSenderId: "705197823964",
  appId: "1:705197823964:web:589a23f557adc9f34aa119"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);