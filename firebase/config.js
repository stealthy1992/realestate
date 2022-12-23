// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmmg0TR_kbz_s6bakIUhv5dYnDBy8LgCk",
  authDomain: "real-estate-f9461.firebaseapp.com",
  projectId: "real-estate-f9461",
  storageBucket: "real-estate-f9461.appspot.com",
  messagingSenderId: "461771442282",
  appId: "1:461771442282:web:c5776fe533a63ddb3c6213"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}