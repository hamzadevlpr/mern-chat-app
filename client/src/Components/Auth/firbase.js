import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJDJZQONWw2emNWXiL6vBLCLJ8Vo2IG7U",
    authDomain: "chatapp-bdb89.firebaseapp.com",
    projectId: "chatapp-bdb89",
    storageBucket: "chatapp-bdb89.appspot.com",
    messagingSenderId: "966755686101",
    appId: "1:966755686101:web:0bac7de2e10d7b2391b45c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };