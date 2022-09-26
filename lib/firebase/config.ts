// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSmZJrye51deOMYAtOFwPVqoksTxJsmX4",
  authDomain: "solicitudtransferencia-42344.firebaseapp.com",
  projectId: "solicitudtransferencia-42344",
  storageBucket: "solicitudtransferencia-42344.appspot.com",
  messagingSenderId: "663415187481",
  appId: "1:663415187481:web:34af699deba0b484f2a288",
  measurementId: "G-GS0H1YFBEB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp