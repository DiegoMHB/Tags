import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";

const url = "http://localhost:3000/"

export type UserStoreType = {
    user: User
    loading: boolean
    error: string
    signIn: (user: NewUser) => void
    logIn: (user: NewUser) => void
}

const initialUser: User = {
    name: "",
    userName: "",
    email: "",
    password: "",
    city: "",
    profilePicture: null,
    id: "",
    createdAt : ""
};

export const userStore = create<UserStoreType>()((set) => ({

    user: initialUser,
    loading: false,
    error: "",

    signIn: async (user: NewUser) => {
        //request to backend. if ok: navigates to profile, setAuth, set user
        //if not: error = message -> signIn
        set({ loading: true });

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
                console.log(errorData,'-- ERROR --')
                set({ error: errorData.message });
                return

            }
            const data = await response.json(); 
            console.log('dataaaa', data)
            set({user:{...data.user},error:data.message})

        } catch (e) {
            set({ error: e as string })
        } finally {
            set({ loading: false });
        }


    },

    logIn: (form: LoginForm) => {
        console.log(form)
        //request to backend. if ok: navigates to profile, setAuth, set user
        //if not: error = message -> logIn
    }

}))
