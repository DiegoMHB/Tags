import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";
import { appStore } from "./appStore";

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type UserStoreType = {
    user: User
    auth: boolean
    loading: boolean

    signIn: (user: NewUser) => void
    logIn: (user: LoginForm) => void
    logOut: () => void
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

export const userStore = create<UserStoreType>()((set) => ({

    user: initialUser,
    auth: false,
    loading: false,

    signIn: async (user: NewUser): Promise<void> => {
        set({ loading: true });
        console.log("signIn")

        try {
            const response = await fetch(`${url}register`, {
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
            const response = await fetch(`${url}login`, {
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
            appStore.setState({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false })
        }
    },

    logOut: async (): Promise<void> => {
        console.log("logOut")
        try {
            const response = await fetch(`${url}logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Session couldn\'t be closed');
            }
            set(() => ({
                user: initialUser,
                auth: false,
                loading: false,
                error: "",
                authUserActivePost: null
            }))
            return
        } catch (error) {
            appStore.setState({ error: error as string });
        }
    }

}))
