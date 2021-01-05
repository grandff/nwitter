import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


/* 젠장 */
/*
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID     
};*/
const firebaseConfig = {
    apiKey: "AIzaSyBuyKqLZipXnLF-GnsVndd9SjQNvin_Kuk",
    authDomain: "nwitter-c33db.firebaseapp.com",
    projectId: "nwitter-c33db",
    storageBucket: "nwitter-c33db.appspot.com",
    messagingSenderId: "111942113812",
    appId: "1:111942113812:web:4f03ea76a487e337202501"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();