// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT-L3ujEhH5PGWsjvFvLKO5PslUTHBtQQ",
  authDomain: "todo-app-d3460.firebaseapp.com",
  projectId: "todo-app-d3460",
  storageBucket: "todo-app-d3460.appspot.com",
  messagingSenderId: "12599818321",
  appId: "1:12599818321:web:383cabc1fbaafa77f16070",
  measurementId: "G-JPJ717VV4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);