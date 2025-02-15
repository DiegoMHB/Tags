import { create } from "zustand";

export type AppStoreType = {
    error: string,
    selectedFile: File | null,
    mapRender: boolean,
    fotoUrl: string,
    
    setError : (error : string)=> void
    setMapRender: () => void,
    setFotoUrl: (url : string) =>void,
    setSelectedFile: (file:File | null) => void,



}

export const appStore = create<AppStoreType>()((set) => ({
    error: "",
    mapRender: false,
    fotoUrl: "", 
    selectedFile: null,
    
    setError: (err : string) => set({ error: err }),
    setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
    setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
    setSelectedFile: (file) => set({ selectedFile: file }),
    
}))