import { create } from "zustand";
import { NewUser, User } from "../types/userTypes";
import { LoginForm } from "../types/appTypes";
import { NewPostType, PostType } from "../types/postTypes";

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type UserStoreType = {
    user: User
    auth: boolean
    loading: boolean
    error: string
    userPostsList: PostType[] | [] //My posts
    activePost: PostType | null

    createActivePost: (post: NewPostType) => void
    getUserPosts: () => void
    deletePost: (id: string) => void
    closeActivePost: () => void
    editActivePost: (changes: Partial<NewPostType>) => void

    signIn: (user: NewUser) => void
    logIn: (user: LoginForm) => void
    logOut: () => void
}

const initialUser: User = {
    name: "",
    userName: "",
    email: "",
    password: "",
    city: "",
    profilePicture: null,
    id: "",
    createdAt: null,
    posts: [] //

};

export const userStore = create<UserStoreType>()((set, get) => ({

    user: initialUser,
    auth: false,
    loading: false,
    error: "",
    activePost: null,
    userPostsList: [],

    createActivePost: async (post: NewPostType) => {
        set({ loading: true });
        console.log('createActivePost')
        try {
            const response = await fetch(`${url}newPost`, {
                method: "POST",
                body: JSON.stringify(post),
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
            set((state) => ({ userPostsList: [...state.userPostsList, data.post] }));
            set({ error: "" });
            //after duration activePost = null
            setTimeout(() => {
                set({ activePost: null })
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
            const response = await fetch(`${url}deletePost`, {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data) //advertir al usuario
            }
            const data = await response.json();
            set({ error: data.message });


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
            const postId = get().activePost!.id;
            const response = await fetch(`${url}closePost/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data) //advertir al usuario
            }
            const data = await response.json();
            set({ activePost: null });
            set({ error: data.message });
            set((state) => ({
                userPostsList: state.userPostsList.map((post) =>
                    post.id === postId ? { ...post, active: false } : post
                )
            }));


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    editActivePost: async (changes) => {
        console.log("editActivePost")
        set({ loading: true });
        const id = get().userPostsList.filter((post: PostType) => post.isActive)[0].id;

        try {
            const response = await fetch(`${url}editPost`, {
                method: "PATCH",
                body: JSON.stringify({ ...changes, id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data) //advertir al usuario
            }
            const data = await response.json();
            set({ error: data.message });


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getUserPosts: async () => {
        console.log("getUserPosts")
        set({ loading: true });
        const id = get().user.id
        try {
            const response = await fetch(`${url}getAllPosts/${id}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ userPostsList: data.posts })
            const activePost = get().userPostsList.filter((post: PostType) =>
                post.isActive)[0];
            set({ activePost });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },




    signIn: async (user: NewUser): Promise<void> => {
        set({ loading: true });
        console.log("signIn")

        try {
            const response = await fetch(`${url}register`, {
                method: "POST",
                body: JSON.stringify(user),
                credentials: 'include',
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
            set({ user: { ...data.user }, error: data.message });
            set({ auth: true });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }


    },

    logIn: async (form: LoginForm): Promise<void> => {
        set({ loading: true });
        console.log("logIn")
        try {
            const response = await fetch(`${url}login`, {
                method: "POST",
                body: JSON.stringify(form),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            };
            const data = await response.json();
            set({ user: { ...data.user }, error: data.message })
            set({ auth: true });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false })
        }
    },

    logOut: async (): Promise<void> => {
        console.log("logOut")
        try {
            const response = await fetch(`${url}logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Session couldn\'t be closed');
            }
            set(() => ({
                user: initialUser,
                auth: false,
                loading: false,
                error: "",
                activePost: null
            }))
            return
        } catch (error) {
            set({ error: error as string });
        }
    }

}))
