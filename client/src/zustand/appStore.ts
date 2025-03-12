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
    selectedUser: User | null

    getPosts: () => void,
    getUserFromId: (postId: string) => void,
    setError: (error: string) => void,
    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getNotOwnedChat: (userId: string, postUserId: string, postId: string) => void
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

    getPosts: async () => {
        set({ loading: true });
        if (get().posts) {
            set({ posts: [] })
        }
        const response = await fetch(`${url}getPosts`, {
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

    getUserFromId: async (userId: string) => {
        set({ loading: true });

        try {
            const response = await fetch(`${url}user/${userId}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ selectedUser: data.user });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getNotOwnedChat: async (userId, postId, postUserId) => {
        set({ loading: true });

        try {
            const response = await fetch(`${url}notOwnedChat`, {
                method: "Post",
                body: JSON.stringify({ userId, postId, postUserId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ error: data.message });


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    }
}))