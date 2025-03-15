import { create } from "zustand";
import { ChatType, PostType } from "../types/postTypes";
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
    currentChat: ChatType | null,

    getAllPosts: () => void,
    getUserById: (userId: string) => void,
    setError: (error: string) => void,
    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getChatById: (id: string) => void,
    createChat: (postId: string, owner: string, notOwner: string) => void
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

    setError: (err: string) => set({ error: err }),
    setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
    setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
    setSelectedFile: (file) => set({ selectedFile: file }),

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
    getChatById: async (id) => {
        set({ loading: true });
        console.log("getChatById")
        try {
            const response = await fetch(`${url}chat/${id}`);
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
    createChat: async (postId, ownerId, notOwnerId) => {
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

            //chatId in post.chatList
            const chatId = data.chat.id;
            const posts = get().posts;
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? { ...post, chatList: [...post.chatList, chatId] }
                    : post
            );
            set({ posts: updatedPosts, error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },
    createMessage: async (message, userId) => {
        set({ loading: true });
        console.log("createChat")
        try {
            const response = await fetch(`${url}newChat`, {
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