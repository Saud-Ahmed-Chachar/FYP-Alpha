// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Only import once

// Your web app's Firebase configuration
// more code here
const firebaseConfig = {
  apiKey: "AIzaSyDiOe_9TmZXravlUMhRi0HbQH6fqP7uPQw",
  authDomain: "uni-select-main.firebaseapp.com",
  projectId: "uni-select-main",
  storageBucket: "uni-select-main.appspot.com",
  messagingSenderId: "312805977977",
  appId: "1:312805977977:web:d8e7fefe8013b047f309a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
