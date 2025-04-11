import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";





const firebase = import.meta.env.VITE_FIREBASE_API;

const firebaseConfig = {
    apiKey: firebase,
    authDomain: "taxi-39e95.firebaseapp.com",
    projectId: "taxi-39e95",
    storageBucket: "taxi-39e95.firebasestorage.app",
    messagingSenderId: "467277184687",
    appId: "1:467277184687:web:f3d548ea9c9b2d32375e5a"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);


