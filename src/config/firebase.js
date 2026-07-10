
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:

"AIzaSyB2DGVHKSK2IynymUz97VMcT-bnfaSwbfc",

authDomain:

"tienda-traslados.firebaseapp.com",

projectId: "tienda-traslados",

storageBucket:

"tienda-traslados.firebasestorage.app",

messagingSenderId: "264982458787",


"1:264982458787:web:a2240d5bc36f


appId:

bf0759aa16"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);