import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"




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

export async function uploadFile(file: File, location: string) {
    const fileExtension = file.name.split(".").pop();
    const metadata = {
        contentType: file.type,
    };

    const storageRef = ref(storage, location + v4() + fileExtension);
    const upLoaded = await uploadBytes(storageRef, file, metadata);
    if (upLoaded.metadata) {
        const url = await getDownloadURL(storageRef);
        return url
    }
    else {
        return
    }
}
