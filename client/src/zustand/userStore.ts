import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { v4 as v4uuid } from "uuid";
import { LoginForm } from "../types/appTypes";

export type UserStoreType = {
    user: User
    loading : boolean
    error : string
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
    friends: [],
    posts: []
};

export const userStore = create<UserStoreType>()((set) => ({

    user: initialUser,
    loading: false,
    error : "",

    signIn: (user : NewUser) => {
        //request to backend. if ok: navigates to profile, setAuth, set user
        //if not: error = message -> signIn
      
    },

    logIn : (form : LoginForm) => {
        //request to backend. if ok: navigates to profile, setAuth, set user
        //if not: error = message -> logIn
    }

   }))
