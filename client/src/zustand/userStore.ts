import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";

const url = "http://localhost:3000/"

export type UserStoreType = {
    user: User
    auth: boolean
    loading: boolean
    message: string
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
    message: "",

    
    signIn: async (user: NewUser) => {
        set({ loading: true });
        console.log(user)

        try {
            const response = await fetch(`${url}register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                set({ message: errorData.message });
                return errorData.message

            }
            const data = await response.json();
            console.log(data)
            set({ user: { ...data.user }, message: data.message })
            set({ auth: true })

        } catch (e) {
            set({ message: e as string })
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
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                set({ message: errorData.message });
                return
            };
            const data = await response.json();
            set({ user: { ...data.user }, message: data.message })
            set({ auth: true })
            
        } catch (e) {
            console.log(e)
        } finally {
            set({ loading: false })
        }
    },
    logOut:  () => {
        set(()=> ({
            user: initialUser,
            auth: false,
            loading: false,
            message: "",
        }))
    }

}))
