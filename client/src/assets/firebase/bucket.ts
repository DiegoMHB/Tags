import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { ensureFirebaseUser } from "./auth";




export async function uploadFile(file: File, location: string) {
    const user = await ensureFirebaseUser();
    const uid = user.uid;
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const metadata = {
        contentType: file.type,
    };
    const storageRef = ref(storage, `/${location}/${uid}/${timestamp}.${fileExtension}`);

    const upLoaded = await uploadBytes(storageRef, file, metadata);
    if (upLoaded.metadata) {
        const url = await getDownloadURL(storageRef);
        return url
    }
    else {
        return
    }
}