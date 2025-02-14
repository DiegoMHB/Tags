import { create } from "zustand";

export type AppStoreType = {
    error: string,
    setError : (error : string)=> void
    mapRender: boolean,
    setMapRender: () => void,
}

export const appStore = create<AppStoreType>()((set) => ({
    error: "",
    setError: (err : string) => set({ error: err }),
    mapRender: false,
    setMapRender: () => set((state) => ({ mapRender: !state.mapRender }))
}))