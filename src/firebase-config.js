import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAsFvK2xBKR9dpZLtWjvjg6DF6gLNddUi0",
    authDomain: "csci318-2790f.firebaseapp.com",
    projectId: "csci318-2790f",
    storageBucket: "csci318-2790f.appspot.com",
    messagingSenderId: "798576206313",
    appId: "1:798576206313:web:98e4bd21350d131a392b78"
  };

  const app = initializeApp(firebaseConfig);
  export const db  = getFirestore(app);