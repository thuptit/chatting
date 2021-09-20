import firebase from 'firebase/compat/app';
import   'firebase/compat/auth';
import   'firebase/compat/database'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaKglGrpc-_mcPPg324Gp1bTY8Nm5mv68",
  authDomain: "smartchatnvt.firebaseapp.com",
  projectId: "smartchatnvt",
  storageBucket: "smartchatnvt.appspot.com",
  messagingSenderId: "935670736438",
  appId: "1:935670736438:web:a8efc83f6ca6258c695a97",
  databaseURL: "https://smartchatnvt-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = firebase.initializeApp(firebaseConfig);

const firebaseAuth = app.auth();
const firebaseDb = app.database();
export {firebaseAuth, firebaseDb}

