import { create } from "zustand";
import { PostType } from "../types/postTypes";
import { User } from "../types/userTypes";
import { AllChatsListElement, ChatType } from "../types/appTypes";
import { API_URL } from "../config";


export type AppStoreType = {
    error: string,
    loading: boolean,

    selectedFile: File | null,
    mapRender: boolean,
    fotoUrl: string,

    authUserActivePost: PostType | null,
    authUserPostsList: PostType[] | null
    allActivePosts: PostType[] | null,
    allChats: AllChatsListElement[] | null,

    selectedUser: User | null,
    selectedPost: PostType | null,
    selectedChat: ChatType | null,


    setSelectedPost: (postId: string) => void,
    deselectUser: () => void,
    deselectPost: () => void,
    deselectChat: () => void,
    resetSelected: () => void,


    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getAllPosts: () => void,
    getUserById: (userId: string, returns?: boolean) => Promise<void | User>,
}


export const appStore = create<AppStoreType>(
    (set, get) => ({
        error: "",
        loading: false,
        mapRender: false,
        fotoUrl: "",
        selectedFile: null,

        authUserActivePost: null,
        authUserPostsList: null,
        allActivePosts: null,
        allChats: null,

        selectedUser: null,
        selectedPost: null,
        selectedChat: null,

        setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
        setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
        setSelectedFile: (file) => set({ selectedFile: file }),

        deselectChat: () => set({ selectedChat: null }),
        deselectUser: () => set({ selectedUser: null }),
        deselectPost: () => set({ selectedPost: null }),
        resetSelected: () => set({ selectedPost: null, selectedUser: null, selectedChat: null }),

        setSelectedPost: (postId: string) => {
            const allPosts = [...get().allActivePosts!, ...get().authUserPostsList!]
            const post = allPosts.find(post => post.id === postId);
            set({ selectedPost: post })
        },

        getAllPosts: async () => {
            set({ loading: true });
            console.log("getAllPosts");
            set({ allActivePosts: [] });

            try {
                const response = await fetch(`${API_URL}getAllPosts`);
                if (!response.ok) throw new Error("Couldn't get active posts");

                const data = await response.json();
                set({ loading: false, allActivePosts: data.posts });
            } catch (error) {
                console.log("hola")
                console.error(error);
            }
        },

        getUserById: async (userId: string, returns: boolean = false) => {
            set({ loading: true });
            console.log("getUserById");


            try {
                const response = await fetch(`${API_URL}user/${userId}`);
                if (!response.ok) {
                    const data = await response.json();
                    set({ error: data.error });
                    throw data;
                }

                const data = await response.json();
                if (returns) return data.user;
                set({ selectedUser: data.user });
            } catch (e) {
                console.log("Error", e);
            } finally {
                set({ error: "", loading: false });
            }
        }
    })
);
