import { create } from "zustand";

export type AppStoreType ={
    mapRender:boolean,
    setMapRender : ()=> void,
}

export const appStore = create<AppStoreType>()((set) => ({
    mapRender: false,
    setMapRender: () => set((state ) => ({ mapRender: !state.mapRender}))
}))