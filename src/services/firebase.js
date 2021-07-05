
// Import firebase npm package
// Import the auth module from firebase
// Initialize the firebase app
// Setup our provider for google sign in
// define login and logout action
// export functionality

import firebase from "firebase/app";
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyD8tmi8jDb7D64nY3hfHEMmlQg4q2_RROs",
  authDomain: "react-people-f7b1d.firebaseapp.com",
  projectId: "react-people-f7b1d",
  storageBucket: "react-people-f7b1d.appspot.com",
  messagingSenderId: "887229362254",
  appId: "1:887229362254:web:abc6492933ae880befd31f",
  measurementId: "G-CZ5BD3W6Y6"
};


  firebase.initializeApp(config);

  const auth = firebase.auth();
  
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  
  function signOut() {
    return auth.signOut();
  }
  
  export { signUp, signOut, login, auth };