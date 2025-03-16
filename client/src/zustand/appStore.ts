import { create } from "zustand";
import {  PostType } from "../types/postTypes";
import { User } from "../types/userTypes";
import { ChatType } from "../types/appTypes";

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
    currentChat: ChatType | null,
    allPostsChat: ChatType[] | null,

    getAllPosts: () => void,
    getUserById: (userId: string) => void,
    setError: (error: string) => void,
    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getChatById: (id: string) => void,
    getChatsByPostId: (id:string)=>void,
    createChat: (postId: string, owner: string, notOwner: string) => Promise<ChatType | void>
    createMessage: (message: string, userId: string) => void
}


export const appStore = create<AppStoreType>()((set, get) => ({
    error: "",
    mapRender: false,
    fotoUrl: "",
    selectedFile: null,
    posts: [],
    loading: false,
    selectedUser: null,
    currentChat: null,
    allPostsChat:  null,

    setError: (err: string) => set({ error: err }),
    setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
    setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
    setSelectedFile: (file) => set({ selectedFile: file }),
    deselecUser: () => {
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

    getUserById: async (userId: string) => {
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
            set({ selectedUser: data.user });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    createChat: async (postId, ownerId, notOwnerId) =>  {
        set({ loading: true });
        console.log("createChat")
        try {
            const response = await fetch(`${url}newChat`, {
                method: "POST",
                body: JSON.stringify({ postId, ownerId, notOwnerId }),
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
            set({ currentChat: data.chat });

            //update the post
            const posts = get().posts;
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? post = data.post
                    : post
            );
            set({ posts: updatedPosts, error: "" });
            return data.chat
        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getChatById: async (id) => {
        set({ loading: true });
        console.log("getChatById", id)
        try {
            const response = await fetch(`${url}getChatById/${id}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ currentChat: data.chat });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getChatsByPostId:async (id)=>{
        
        set({ loading: true });
        console.log("getChatsByPostId", id)
        try {
            const response = await fetch(`${url}getChatsByPostId/${id}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ allPostsChat: data.chats });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    createMessage: async (message, userId) => {
        set({ loading: true });
        console.log("createMessage")
        try {
            const response = await fetch(`${url}newMessage`, {
                method: "POST",
                body: JSON.stringify({ message, userId }),
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
            set({ currentChat: data.chat });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    }

}))