// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2YAUegSlMetYnjs8-m09X-A2zg3RHnn0",
  authDomain: "vitrinim-76220.firebaseapp.com",
  projectId: "vitrinim-76220",
  storageBucket: "vitrinim-76220.appspot.com",
  messagingSenderId: "1043656753489",
  appId: "1:1043656753489:web:79ab1f703f63d8bb301370",
  measurementId: "G-83Z0BQ1EXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);