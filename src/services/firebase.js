
// Import firebase npm package
// Import the auth module from firebase
// Initialize the firebase app
// Setup our provider for google sign in
// define login and logout action
// export functionality

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'


const config = {
  apiKey: "AIzaSyDFrry6D1UD5KqpBNy8MOmCYKhN0IC6gaM",
  authDomain: "socialapp-b16b7.firebaseapp.com",
  projectId: "socialapp-b16b7",
  storageBucket: "socialapp-b16b7.appspot.com",
  messagingSenderId: "621371366953",
  appId: "1:621371366953:web:9e37267b68fa31edc6c638"
};


  firebase.initializeApp(config);

  const auth = firebase.auth();
  const database = firebase.database();

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signInWithGoogle() {
    return auth.signInWithPopup(googleProvider);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  export { signUp, signOut, login, auth, signInWithGoogle, database };