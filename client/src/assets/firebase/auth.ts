import { getAuth, linkWithCredential, signInAnonymously, signInWithEmailAndPassword, User } from "firebase/auth";
import { userStore } from "../../zustand/userStore";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { auth } from "./firebase";

;

export async function ensureFirebaseUser(): Promise<User> {
    // authenticated user:
    if (auth.currentUser) {
        console.log("User already authenticated:", auth.currentUser.uid);
        return auth.currentUser;
    }

    // no auth user:
    try {
        const result = await signInAnonymously(auth);
        const uid = result.user.uid;
        userStore.getState().setUid(uid);
        console.log("Anonymous user created:", uid);
        return result.user;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function upgradeAnonUser(email: string, password: string) {
    if (!auth.currentUser) throw new Error("No user is signed in");

    const credential = EmailAuthProvider.credential(email, password);

    try {
        const result = await linkWithCredential(auth.currentUser, credential);
        console.log("Usuario actualizado, uid:", result.user.uid);
        return result.user;
    } catch (error) {
        console.log("Error:",error)
    }
}

export async function loginUser(email: string, password: string) {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged User:", result.user.uid);
    return result.user;
  }