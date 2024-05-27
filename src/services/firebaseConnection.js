// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs8bAEkqoA99D-YyIxedN3liHzkHzErP0",
  authDomain: "agraria-di.firebaseapp.com",
  projectId: "agraria-di",
  storageBucket: "agraria-di.appspot.com",
  messagingSenderId: "207518639393",
  appId: "1:207518639393:web:c9ff3b1fde06bd5fbcca60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };