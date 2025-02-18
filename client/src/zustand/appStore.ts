import { create } from "zustand";
import { PostType } from "../types/postTypes";

const url = "http://localhost:3000/"

export type AppStoreType = {
    error: string,
    selectedFile: File | null,
    mapRender: boolean,
    fotoUrl: string,
    posts: PostType[],
    loading: boolean,

    getPosts : ()=> void,
    setError : (error : string)=> void,
    setMapRender: () => void,
    setFotoUrl: (url : string) =>void,
    setSelectedFile: (file:File | null) => void,



}

export const appStore = create<AppStoreType>()((set) => ({
    error: "",
    mapRender: false,
    fotoUrl: "", 
    selectedFile: null,
    posts: [],
    loading:false,
    
    setError: (err : string) => set({ error: err }),
    setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
    setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
    setSelectedFile: (file) => set({ selectedFile: file }),
    getPosts: async () => {
        set({loading : true});
        const response = await fetch(`${url}getPosts`, {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error('Couldn´t get posts');
        }
        const data = await response.json();
        console.log(data.posts)
        set(()=> ({
            loading: false,
            posts: data.posts
        }))
    }
    
}))