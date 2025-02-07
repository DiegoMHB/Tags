import { create } from "zustand";

export type AppStoreType ={
    auth:boolean,
    mapRender:boolean,
    setAuth : ()=> void,
    setMapRender : ()=> void,
}

export const appStore = create<AppStoreType>()((set) => ({
    auth: false,
    mapRender: false,
    setAuth: () => set((state) => ({ auth: !state.auth, mapRender: state.mapRender? !state.mapRender: state.mapRender})),
    setMapRender: () => set((state ) => ({ mapRender: !state.mapRender}))
}))