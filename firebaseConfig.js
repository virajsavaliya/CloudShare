// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVMyUGspuZLwjckqv1sb9CpBg3xXkQ56g",
  authDomain: "file-sharing-app-c63a0.firebaseapp.com",
  projectId: "file-sharing-app-c63a0",
  storageBucket: "file-sharing-app-c63a0.appspot.com",
  messagingSenderId: "616447313925",
  appId: "1:616447313925:web:db692a9c95ae28f17df46c",
  measurementId: "G-F5G183J837"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
