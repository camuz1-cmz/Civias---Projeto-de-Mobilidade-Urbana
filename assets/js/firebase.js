import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0h7aPP7_iQD-He2poXUtioSfdWWc9Zbc",
  authDomain: "civias-e511f.firebaseapp.com",
  projectId: "civias-e511f",
  storageBucket: "civias-e511f.firebasestorage.app",
  messagingSenderId: "579079092420",
  appId: "1:579079092420:web:1b6566c15b40bec6cdb191"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
