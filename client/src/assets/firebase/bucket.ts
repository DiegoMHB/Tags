import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { userStore } from "../../zustand/userStore";
import { getAuth, signInAnonymously } from "firebase/auth";



export async function uploadFile(file: File, location: string) {
    const auth = getAuth();
    let uid = auth.currentUser?.uid;

    if (location == "/Profile_pics/" && !userStore.getState().auth) try {
        await signInAnonymously(auth);
        console.log("User has been authenticated");
        uid = auth.currentUser?.uid;  
    } catch (error) {
        console.error("Authentication error:", error);
        return;
    }

    if (!uid) {
        console.error("User has no valid UID");
        return;
    }

    const fileExtension = file.name.split(".").pop();
    const metadata = {
        contentType: file.type,
    };

    const storageRef = ref(storage, location + uid + "." + new Date().getTime() + "." + fileExtension);
    const upLoaded = await uploadBytes(storageRef, file, metadata);
    if (upLoaded.metadata) {
        const url = await getDownloadURL(storageRef);
        return url
    }
    else {
        return
    }
}