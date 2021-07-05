
// Import firebase npm package
// Import the auth module from firebase
// Initialize the firebase app
// Setup our provider for google sign in
// define login and logout action
// export functionality

import firebase from "firebase/app";
import 'firebase/auth';


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