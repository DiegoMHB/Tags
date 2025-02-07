import { create } from "zustand";

type AppStore ={
    auth:boolean,
    mapRender:boolean,
}

export const appStore = create((set) => ({
    auth: false,
    mapRender: false,
    setAuth: () => set((state : AppStore) => ({ auth: !state.auth})),
    setMapRender: () => set((state : AppStore) => ({ mapRender: !state.mapRender}))
}))