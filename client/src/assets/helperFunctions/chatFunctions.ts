
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
    console.log('1er log',appState.selectedChat)

    if (appState.selectedChat) {
        const otherUserId =
            userState.user.id === appState.selectedChat.ownerId
                ? appState.selectedChat.notOwnerId
                : appState.selectedChat.ownerId;
        await postState.getPostById(appState.selectedChat.postId)
        await appState.getUserById(otherUserId);

    }
}


export async function populateStoreWithChatDataList(id: string): Promise<void> {

    const chatState = chatStore.getState();
    await chatState.getChatsByPostId(id)


}