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
    allUserPosts: PostType[] | []
    activePost: PostType | null

    createActivePost: (post: NewPostType) => void
    getAllUsersPosts: (id: string) => void
    deleteActivePost: () => void
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
    posts: []

};

export const userStore = create<UserStoreType>()((set, get) => ({

    user: initialUser,
    auth: false,
    loading: false,
    error: "",
    activePost: null,
    allUserPosts: [],

    createActivePost: async (post: NewPostType) => {
        set({ loading: true });
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
            set((state) => ({ allUserPosts: [...state.allUserPosts, data.post] }));
            set({ error: "" });
            //eliminating it from active Post

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }


    },

    deleteActivePost: async () => {
        set({ loading: true });
        try {
            const id = get().activePost!.id;
            const response = await fetch(`${url}deletePost`, {
                method: "DELETE",
                body: JSON.stringify({ id}),
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
        try {
            const id = get().activePost!.id;
            const response = await fetch(`${url}closePost`, {
                method: "POST",
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
            set({ activePost: null });
            set({ error: data.message });


        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    editActivePost: async (changes) => {
        set({ loading: true });
        const id = get().allUserPosts.filter((post: PostType) => post.isActive)[0].id;

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

    getAllUsersPosts: async (userId: string) => {
        set({ loading: true });
        try {
            const response = await fetch(`${url}getUsersPosts`, {
                method: "POST",
                body: JSON.stringify({ userId }),
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
            set({ allUserPosts: data.posts })
            const activePost = get().allUserPosts.filter((post: PostType) =>
                post.isActive)[0];
            set({ activePost: activePost });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },




    signIn: async (user: NewUser): Promise<void> => {
        set({ loading: true });

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
