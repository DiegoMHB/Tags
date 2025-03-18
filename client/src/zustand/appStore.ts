import { create } from "zustand";
import { PostType } from "../types/postTypes";
import { User } from "../types/userTypes";

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type AppStoreType = {
    error: string,
    selectedFile: File | null,
    mapRender: boolean,
    fotoUrl: string,
    posts: PostType[],
    loading: boolean,
    selectedUser: User | null,
   

    getAllPosts: () => void,
    getUserById: (userId: string, returns?: boolean) =>  Promise<void |User>,
    setError: (error: string) => void,
    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    deselectUser: () => void,
}


export const appStore = create<AppStoreType>()((set, get) => ({
    error: "",
    mapRender: false,
    fotoUrl: "",
    selectedFile: null,
    posts: [],
    loading: false,
    selectedUser: null,

    setError: (err: string) => set({ error: err }),
    setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
    setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
    setSelectedFile: (file) => set({ selectedFile: file }),
    deselectUser: () => {
        set({ selectedUser: null })
    },

    getAllPosts: async () => {
        set({ loading: true });
        console.log("getAllPosts")
        if (get().posts) {
            set({ posts: [] })
        }
        const response = await fetch(`${url}getAllPosts`, {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error('Couldn´t get posts');
        }
        const data = await response.json();
        set(() => ({
            loading: false,
            posts: data.posts
        }))
    },

    getUserById: async (userId: string, returns: boolean = false ) => {
        set({ loading: true });
        console.log("getUserById")

        try {
            const response = await fetch(`${url}user/${userId}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();

            if (returns) {
                return data.user
            } else {
                set({ selectedUser: data.user });
            }

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ error: "" });
            set({ loading: false });
        }
    },

   

}))