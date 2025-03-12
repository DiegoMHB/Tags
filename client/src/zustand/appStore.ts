import { create } from "zustand";
import { ChatType, PostType } from "../types/postTypes";
import {  User } from "../types/userTypes";
import { ChatByOwner } from "../types/appTypes";

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
    chats: ChatByOwner
    notOwnedChat: ChatType

    getPosts: () => void,
    getUserFromId: (postId: string) => void,
    setError: (error: string) => void,
    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getChatById: (chatId:string) => void,
    getChatsByIdList: (chatIds:string[]) => void,
}


export const appStore = create<AppStoreType>()((set, get) => ({
    error: "",
    mapRender: false,
    fotoUrl: "",
    selectedFile: null,
    posts: [],
    loading: false,
    selectedUser: null,
    chats:{owned:null, notOwned:null},

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

    getChatById: async (chatId) =>{
        set({ loading: true });
        try {
            const response = await fetch(`${url}getChatById`, {
                method: "POST",
                body: JSON.stringify( {chatId} ),
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
            set({ notOwnedChat: data.chat });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },
    getChatsByIdList: (chatIds) => {},
}))