import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { ensureFirebaseUser } from "./auth";



// Function to upload a file to Firebase Storage
export async function uploadFile(file: File, location: string) {
    const user = await ensureFirebaseUser();
    const uid = user.uid;
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const metadata = {
        contentType: file.type,
    };
    // Create a reference in Firebase Storage: /location/uid/timestamp.ext
    const storageRef = ref(storage, `/${location}/${uid}/${timestamp}.${fileExtension}`);
    // Upload the file to Firebase Storage
    const upLoaded = await uploadBytes(storageRef, file, metadata);

    // If upload was successful, get the public download URL
    if (upLoaded.metadata) {
        const url = await getDownloadURL(storageRef);
        return url
    }
    else {
        // If upload failed, return undefined
        return
    }
}