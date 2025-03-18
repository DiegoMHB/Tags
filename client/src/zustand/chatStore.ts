import { create } from "zustand";
import { ChatType, Message } from "../types/appTypes";
import { appStore} from "./appStore";

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type ChatStoreType = {
    error: string,
    loading: boolean,
    currentChat: ChatType | null,
    allPostChats: ChatType[] | null,

  
    getChatById: (id: string) => void,
    getChatsByPostId: (id: string) => void,
    createChat: (postId: string, owner: string, notOwner: string) => Promise<ChatType | void>
    createMessage: (message: Message, userId: string) => void
}


export const chatStore = create<ChatStoreType>()((set, get) => ({
    error: "",
    loading: false,
    currentChat: null,
    allPostChats: null,


    createChat: async (postId, ownerId, notOwnerId) => {
        set({ loading: true });
        console.log("createChat")
        try {
            const response = await fetch(`${url}newChat`, {
                method: "POST",
                body: JSON.stringify({ postId, ownerId, notOwnerId }),
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
            set({ currentChat: data.chat });

            //update the post
            const posts = appStore.getState().posts;
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? post = data.post
                    : post
            );
            appStore.setState({ posts: updatedPosts, error: "" });
            return data.chat
        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getChatById: async (id) => {
        set({ loading: true });
        console.log("getChatById", id)
        try {
            const response = await fetch(`${url}getChatById/${id}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ currentChat: data.chat });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getChatsByPostId: async (id) => {

        set({ loading: true });
        console.log("getChatsByPostId", id)
        try {
            const response = await fetch(`${url}getChatsByPostId/${id}`);
            if (!response.ok) {
                const data = await response.json();
                set({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            set({ allPostChats: data.chats });
            set({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    createMessage: async (message, userId) => {
        set({ loading: true });
        const chatId = get().currentChat!.id
        console.log("createMessage")
        try {
            const response = await fetch(`${url}newMessage`, {
                method: "POST",
                body: JSON.stringify({ chatId, message, userId }),
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
            set({ currentChat: data.chat });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    }

}))