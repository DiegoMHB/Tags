import { create } from "zustand";
import { AllChatsListElement, ChatType, Message } from "../types/appTypes";
import { appStore } from "./appStore";
import { userStore } from "./userStore";

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type ChatStoreType = {

    loading: boolean,

    getChatById: (id: string) => void,
    getAllChats: () => void,
    createChat: (postId: string, owner: string, notOwner: string) => Promise<ChatType | void>
    createMessage: (message: Message, userId: string) => void
}


export const chatStore = create<ChatStoreType>()((set) => ({
    loading: false,

    getChatById: async (id) => {
        set({ loading: true });
        console.log("getChatById")
        try {
            const response = await fetch(`${url}getChatById/${id}`);
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            appStore.setState({ selectedChat: data.chat });
            appStore.setState({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    getAllChats: async () => {

        set({ loading: true });
        console.log("getAllChats")
        try {
            const response = await fetch(`${url}getAllMyChats/${userStore.getState().user.id}`);
            if (!response.ok) {
                const data = await response.json();
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();

            const groupedChats = data.chats?.reduce((acc: AllChatsListElement[], chat: ChatType) => {
                const postId = chat.context.post.id;
                let chatGroup = acc.find(group => group.post.id == postId);

                if (!chatGroup) {
                    chatGroup = {
                        post: chat.context.post,
                        chats: []
                    };
                    acc.push(chatGroup);
                }

                chatGroup.chats.push({
                    id: chat.id,
                    owner: chat.context.owner,
                    notOwner: chat.context.notOwner,
                    messages: chat.messages
                });

                return acc;
            }, [] as AllChatsListElement[]);


            appStore.setState({ allChats: groupedChats });
            console.log(appStore.getState().allChats)
            appStore.setState({ error: "" });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

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
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            appStore.setState({ selectedChat: data.chat });

            //update the post with the chatData
            const posts = appStore.getState().allActivePosts;
            const updatedPosts = posts!.map((post) =>
                post.id === postId
                    ? post = data.post
                    : post
            );
            appStore.setState({ allActivePosts: updatedPosts, error: "" });
            return data.chat
        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    },

    createMessage: async (message, userId) => {
        set({ loading: true });
        const chatId = appStore.getState().selectedChat!.id
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
                appStore.setState({ error: data.error });
                throw (data)
            }
            const data = await response.json();
            appStore.setState({ selectedChat: data.chat });

        } catch (e) {
            console.log("Error", e)
        } finally {
            set({ loading: false });
        }
    }

}))