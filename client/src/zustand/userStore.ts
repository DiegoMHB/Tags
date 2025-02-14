import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";

const url = "http://localhost:3000/"

export type UserStoreType = {
    user: User
    auth: boolean
    loading: boolean
    errorMessage: string
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

};

export const userStore = create<UserStoreType>()((set) => ({

    user: initialUser,
    auth: false,
    loading: false,
    errorMessage: "",


    signIn: async (user: NewUser) => {
        set({ loading: true });

        try {
            const response = await fetch(`${url}register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ errorMessage: data.error });
                throw(data)
            }
            const data = await response.json();
            set({ user: { ...data.user }, errorMessage: data.message });
            set({ auth: true });
            set({ errorMessage: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }


    },

    logIn: async (form: LoginForm) => {
        set({ loading: true });
        try {
            const response = await fetch(`${url}login`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ errorMessage: data.error });
                throw(data)
            };
            const data = await response.json();
            set({ user: { ...data.user }, errorMessage: data.message })
            set({ auth: true });
            set({ errorMessage: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false })
        }
    },
    
    logOut: () => {
        set(() => ({
            user: initialUser,
            auth: false,
            loading: false,
            errorMessage: "",
        }))
    }

}))
