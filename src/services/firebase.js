
// Import firebase npm package
// Import the auth module from firebase
// Initialize the firebase app
// Setup our provider for google sign in
// define login and logout action
// export functionality

import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCNrs8PVGiuJRRnjPT6Nc_pgbP1o_Q0Xjo",
    authDomain: "full-stack-social.firebaseapp.com",
    projectId: "full-stack-social",
    storageBucket: "full-stack-social.appspot.com",
    messagingSenderId: "616205507547",
    appId: "1:616205507547:web:444e5a11d35856f27165fe"
  };


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GithubAuthProvider();

function login() {
    return auth.signInWithPopup(provider);
};

function logout() {
    return auth.signOut();
}

export {
    login,
    logout,
    auth
}