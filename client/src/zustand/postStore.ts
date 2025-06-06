import { create } from "zustand";
import { NewPostType, PostType } from "../types/postTypes";
import { userStore } from "./userStore"
import { appStore } from "./appStore";
import { API_URL } from "../config";

export type PostStoreType = {

    loading: boolean

    getPostById: (id: string) => void
    createActivePost: (post: NewPostType) => void
    getUserPosts: () => void
    deletePost: (id: string) => void
    closeActivePost: () => void
    editActivePost: (changes: Partial<NewPostType>) => void

}


export const postStore = create<PostStoreType>()((set) => ({
    loading: false,


    getPostById: async (id: string) => {
        console.log("getPostById", id)
        set({ loading: true });
        try {
            const response = await fetch(`${API_URL}/getPostById/${id}`);
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            appStore.setState({ selectedPost: data.post })

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }

    },
    createActivePost: async (post: NewPostType) => {
        set({ loading: true });
        console.log('createActivePost')
        try {
            const response = await fetch(`${API_URL}/newPost`, {
                method: "POST",
                body: JSON.stringify(post),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            appStore.setState((state) => ({ authUserPostsList: [...state.authUserPostsList!, data.post] }));
            appStore.setState({ error: "" });
            //after duration authUserActivePost = null
            setTimeout(() => {
                appStore.setState({ authUserActivePost: null })
            }, data.post.duration * 60 * 1000);

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }


    },

    deletePost: async (id: string) => {
        console.log('deletePost')
        set({ loading: true });
        try {
            const response = await fetch(`${API_URL}/deletePost`, {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data) //advertir al usuario
            }
            const data = await response.json();
            appStore.setState({ error: data.message });
            appStore.setState({ error: "" });


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    closeActivePost: async () => {
        set({ loading: true });
        console.log("closeActivePost")

        try {
            const postId = appStore.getState().authUserActivePost!.id;
            const response = await fetch(`${API_URL}/closePost/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data) //advertir al usuario
            }
            const data = await response.json();
            appStore.setState({ authUserActivePost: null });
            appStore.setState({ error: data.message });
            appStore.setState((state) => ({
                authUserPostsList: state.authUserPostsList!.map((post) =>
                    post.id === postId ? { ...post, active: false } : post
                )
            }));
            appStore.setState({ error: "" });


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    editActivePost: async (changes) => {
        console.log("editActivePost")
        set({ loading: true });
        const id = appStore.getState().authUserPostsList!.filter((post: PostType) => post.isActive)[0].id;

        try {
            const response = await fetch(`${API_URL}/editPost`, {
                method: "PATCH",
                body: JSON.stringify({ ...changes, id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data) //advertir al usuario
            }
            const data = await response.json();
            appStore.setState({ error: data.message });
            appStore.setState({ error: "" });


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getUserPosts: async () => {
        console.log("getUserPosts")
        set({ loading: true });
        const id = userStore.getState().user!.id
        try {
            const response = await fetch(`${API_URL}/getUserPosts/${id}`);
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            appStore.setState({ authUserPostsList: data.posts })
            const authUserActivePost = appStore.getState().authUserPostsList!.filter((post: PostType) =>
                post.isActive)[0];
            appStore.setState({ authUserActivePost });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },









}))
