import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCjUPSudD2C5i-pVGdk3AwROY6CDr7ez2U",
    authDomain: "unichat-c9689.firebaseapp.com",
    projectId: "unichat-c9689",
    storageBucket: "unichat-c9689.appspot.com",
    messagingSenderId: "29748722207",
    appId: "1:29748722207:web:74ca31a96a1b0c22d1732a",
  })
  .auth();
