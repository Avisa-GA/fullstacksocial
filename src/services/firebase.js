
// Import firebase npm package
// Import the auth module from firebase
// Initialize the firebase app
// Setup our provider for google sign in
// define login and logout action
// export functionality

import firebase from "firebase/app";
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD8tmi8jDb7D64nY3hfHEMmlQg4q2_RROs",
    authDomain: "react-people-f7b1d.firebaseapp.com",
    projectId: "react-people-f7b1d",
    storageBucket: "react-people-f7b1d.appspot.com",
    messagingSenderId: "887229362254",
    appId: "1:887229362254:web:abc6492933ae880befd31f",
    measurementId: "G-CZ5BD3W6Y6"
  };


  firebase.initializeApp(firebaseConfig);

//   TODO: Initialize the firebase app
// TODO: Setup our provider for google signin
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// TODO: define login and logout actions

function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}
// TODO: export fuctionality

export {
    login,
    logout,
    auth
}