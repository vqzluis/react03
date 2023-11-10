// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVKK3LfPnizLqOO1Z_sfegTOll8cNXcX8",
  authDomain: "proy-react-app03-b83cc.firebaseapp.com",
  projectId: "proy-react-app03-b83cc",
  storageBucket: "proy-react-app03-b83cc.appspot.com",
  messagingSenderId: "622731720231",
  appId: "1:622731720231:web:0f000714d9c8cdeab5c002",
  measurementId: "G-L2YNG37C37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);