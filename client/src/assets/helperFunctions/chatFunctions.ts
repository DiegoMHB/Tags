
import { appStore } from "../../zustand/appStore";
import { chatStore } from "../../zustand/chatStore"
import { postStore } from "../../zustand/postStore";
import { userStore } from "../../zustand/userStore";

export async function populateStoreWithChatData(id: string): Promise<void> {
    console.log("populateStoreWithChatData")

    const chatState = chatStore.getState();
    const userState = userStore.getState();
    const appState = appStore.getState();
    const postState = postStore.getState();

    await chatState.getChatById(id);

    if (appState.selectedChat) {
        const otherUserId =
            userState.user.id === appState.selectedChat.context.owner.userId
                ? appState.selectedChat.context.notOwner.userId
                : appState.selectedChat.context.owner.userId;
        await postState.getPostById(appState.selectedChat.postId)
        await appState.getUserById(otherUserId);

    }
}

