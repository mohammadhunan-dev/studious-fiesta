// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0XHSbWAHF1SsiZMMGLQgVB1OxmHj3fts",
  authDomain: "tickethero-d1634.firebaseapp.com",
  projectId: "tickethero-d1634",
  storageBucket: "tickethero-d1634.appspot.com",
  messagingSenderId: "306282224899",
  appId: "1:306282224899:web:2d91e097cfb2e0e7289d36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app as firebaseApp}