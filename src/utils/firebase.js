// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDukbVADHNlqVsn1xq2Bj1KWtB1D0glqA4",
  authDomain: "example-netflix.firebaseapp.com",
  projectId: "example-netflix",
  storageBucket: "example-netflix.appspot.com",
  messagingSenderId: "961674815172",
  appId: "1:961674815172:web:a67f420f1aaca8df144b91",
  measurementId: "G-WTN5493V0J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
