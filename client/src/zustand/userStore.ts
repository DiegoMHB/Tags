import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";
import { appStore } from "./appStore";
import { postStore } from "./postStore";
import { chatStore } from "./chatStore";
import { getAuth, signOut } from "firebase/auth";
import { loginUserFB, upgradeAnonUser } from "../assets/firebase/auth";
import { API_URL } from "../config";

export type UserStoreType = {
    user: User
    auth: boolean
    loading: boolean
    firebaseUid: string
    loggedOut: boolean

    signIn: (user: NewUser) => void
    logIn: (user: LoginForm) => void
    logInAuto: () => void
    logOut: () => void
    setUid: (str: string) => void
}

const initialUser: User = {
    name: "",
    userName: "",
    email: "",
    password: "",
    city: "",
    profilePicture: null,
    id: "",
    createdAt: null,
    posts: [] //

};

export const userStore = create<UserStoreType>()((set, get) => ({

    user: initialUser,
    auth: false,
    loading: false,
    firebaseUid: "",
    loggedOut: false,

    signIn: async (user: NewUser): Promise<void> => {
        set({ loading: true });
        console.log("signIn")

        try {
            const response = await fetch(`${API_URL}register`, {
                method: "POST",
                body: JSON.stringify(user),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ user: { ...data.user } });
            set({ auth: true });
            appStore.setState({ error: "" });
            upgradeAnonUser(user.email, user.password)

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }


    },

    logIn: async (form: LoginForm): Promise<void> => {
        set({ loading: true });
        console.log("logIn")
        try {
            const response = await fetch(`${API_URL}login`, {
                method: "POST",
                body: JSON.stringify(form),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            };
            const data = await response.json();
            set({ user: { ...data.user } })
            set({ auth: true });
            loginUserFB(form.email, form.password)
            appStore.setState({ error: "" });
        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false })
        }
    },
    logInAuto: async (): Promise<void> => {
        if (get().loggedOut) return
        set({ loading: true });
        console.log("logInAuto")
        try {
            const response = await fetch(`${API_URL}loginAuto`, {
                method: "GET",
                credentials: 'include',
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            };
            response.json().then((res) => {
                set({ user: { ...res.user } })
                set({ auth: true });
                if (get().user!.id) {
                    appStore.getState().getAllPosts();
                    postStore.getState().getUserPosts()
                    chatStore.getState().getAllChats()
                }
            })
            appStore.setState({ error: "" });

            return

        } catch (e) {
            console.log("Error", e)
            return
        }


    },

    logOut: async (): Promise<void> => {
        set({ loading: true });
        console.log("logOut")
        try {
            const response = await fetch(`${API_URL}logOut`, {
                method: "GET",
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Session couldn\'t be closed');
            }
            set(() => ({
                user: initialUser,
                auth: false,
                loading: false,
            }))


            const auth = getAuth();
            await signOut(auth);

            appStore.setState({ error: "" });

        } catch (error) {
            appStore.setState({ error: error as string });
            set({ loading: false });
        }
    },

    setUid: async (uid) => {
        set({ firebaseUid: uid })
    }

}))
