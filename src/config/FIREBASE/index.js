import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database"

firebase.initializeApp({
    apiKey: "AIzaSyBYsrUYe5tWPfjifx6BskwCb1rIF--LW0g",
    authDomain: "myhealthper.firebaseapp.com",
    projectId: "myhealthper",
    storageBucket: "myhealthper.appspot.com",
    messagingSenderId: "764945854336",
    appId: "1:764945854336:web:c0a656b5082b2ad92c9b65"
})

const FIREBASE = firebase;

export default FIREBASE;