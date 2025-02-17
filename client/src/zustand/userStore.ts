import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";
import { NewPostType } from "../types/postTypes";

const url = "http://localhost:3000/"

export type UserStoreType = {
    user: User
    auth: boolean
    loading: boolean
    errorMessage: string
    activePost: NewPostType | null

    createActivePost: (post: NewPostType)=> void
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
    activePost: null,

    createActivePost: async (post: NewPostType) => {
        set({ loading: true });

        try {
            const response = await fetch(`${url}newPost`, {
                method: "POST",
                body: JSON.stringify(post),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ errorMessage: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ activePost: data });            
            set({ errorMessage: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }


    },
        



    signIn: async (user: NewUser) : Promise<void> => {
        set({ loading: true });

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
                set({ errorMessage: data.error });
                throw (data)
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

    logIn: async (form: LoginForm): Promise<void>  => {
        set({ loading: true });
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
                set({ errorMessage: data.error });
                throw (data)
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

    logOut: async () : Promise<void> => {
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
                errorMessage: "",
            }))
            return
        } catch (error) {
            set({ errorMessage: error as string});
        }
    }

}))
