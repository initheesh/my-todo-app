// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTApcenoKkdW2aHTirFi1oG2_-wgjxMRk",
  authDomain: "my-todo-app-1fd9a.firebaseapp.com",
  projectId: "my-todo-app-1fd9a",
  storageBucket: "my-todo-app-1fd9a.appspot.com",
  messagingSenderId: "275981465583",
  appId: "1:275981465583:web:a1546910776d1c69c0681a",
  measurementId: "G-9733YFS7W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
