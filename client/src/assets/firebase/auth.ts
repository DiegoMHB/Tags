import { getAuth, linkWithCredential, signInAnonymously, signInWithEmailAndPassword, User } from "firebase/auth";
import { userStore } from "../../zustand/userStore";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { auth } from "./firebase";


// Ensures there is a Firebase user (creates an anonymous user if none exists)
export async function ensureFirebaseUser(): Promise<User> {
    // If already logged in, return the current user
    if (auth.currentUser) {
        console.log("User already authenticated:", auth.currentUser.uid);
        return auth.currentUser;
    }

    // If no user exists, create an anonymous account
    try {
        const result = await signInAnonymously(auth);
        const uid = result.user.uid;
        // Save the UID in your zustand store
        userStore.getState().setUid(uid);
        console.log("Anonymous user created:", uid);
        return result.user;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Upgrade an anonymous user to an email/password account
export async function upgradeAnonUser(email: string, password: string) {
    if (!auth.currentUser) throw new Error("No user is signed in");

    const credential = EmailAuthProvider.credential(email, password);
    console.log(credential, auth.currentUser)

    try {
        const result = await linkWithCredential(auth.currentUser, credential);
        console.log("Usuario actualizado, uid:", result.user.uid);
        return result.user;
    } catch (error) {
        console.log("Error=>", error)
    }
}



export async function loginUserFB(email: string, password: string) {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged User:", result.user.uid);
    return result.user;
}