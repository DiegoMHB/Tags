
import { appStore } from "../../zustand/appStore";
import { chatStore } from "../../zustand/chatStore"
import { postStore } from "../../zustand/postStore";
import { userStore } from "../../zustand/userStore";

export async function populateStoreChat(id: string): Promise<void> {

    const chatState = chatStore.getState();
    const userState = userStore.getState();
    const appState = appStore.getState();
    const postState = postStore.getState();

    await chatState.getChatById(id);

    if (appState.selectedChat) {
        const otherUserId =
            userState.user.id === appState.selectedChat.ownerId
                ? appState.selectedChat.notOwnerId
                : appState.selectedChat.ownerId;
        await postState.getPostById(appState.selectedChat.postId)
        await appState.getUserById(otherUserId);

    }
}


export async function populateStoreChats(id: string): Promise<void> {

    const chatState = chatStore.getState();
    await chatState.getChatsByPostId(id)


}