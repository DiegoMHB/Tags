import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { v4 as v4uuid } from "uuid";

export type UserStoreType = {
    user: User
    signIn: (user: NewUser) => void
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
    signIn: (user : NewUser) => {
        const id = v4uuid();
        set(()=> ({
            user : {
            ...user,
            id,
            friends : [],
            posts : []
        }}))
    }

   }))
