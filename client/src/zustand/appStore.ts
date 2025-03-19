import { create } from "zustand";
import { PostType } from "../types/postTypes";
import { User } from "../types/userTypes";
import { ChatType } from "../types/appTypes";

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type AppStoreType = {
    error: string,
    loading: boolean,

    selectedFile: File | null,
    mapRender: boolean,
    fotoUrl: string,

    allActivePosts: PostType[],
    authUserPostsList: PostType[] | []
    selectedUser: User | null,
    selectedPost: PostType | null,
    selectedChat: ChatType | null,
    allPostChats: ChatType[] | null,

    setSelectedPost: (id: string) => void
    deselectUser: () => void,
    deselectPost: () => void,
    deselectChat: () => void,


    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getAllPosts: () => void,
    getUserById: (userId: string, returns?: boolean) => Promise<void | User>,
}


export const appStore = create<AppStoreType>()((set, get) => ({
    error: "",
    mapRender: false,
    fotoUrl: "",
    selectedFile: null,
    allActivePosts: [],
    loading: false,
    selectedUser: null,
    authUserPostsList: [],
    selectedChat: null,
    allPostChats: null,
    selectedPost: null,



    setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
    setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
    setSelectedFile: (file) => set({ selectedFile: file }),

    deselectChat: () => {
        set({ selectedChat: null })
    },

    deselectUser: () => {
        set({ selectedUser: null })
    },

    deselectPost: () => {
        appStore.setState({ selectedPost: null })
    },
    
    setSelectedPost: (id) => {
        const userPostList = get().authUserPostsList
        const post = userPostList.find(post => id == post.id);
        appStore.setState({ selectedPost: post })

    },

    getAllPosts: async () => {
        set({ loading: true });
        console.log("getAllPosts")
        if (get().allActivePosts) {
            set({ allActivePosts: [] })
        }
        const response = await fetch(`${url}getAllPosts`, {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error('Couldn´t get active posts');
        }
        const data = await response.json();
        set(() => ({
            loading: false,
            allActivePosts: data.posts
        }))
    },

    getUserById: async (userId: string, returns: boolean = false) => {
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