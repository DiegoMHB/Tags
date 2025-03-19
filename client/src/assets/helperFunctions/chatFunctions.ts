
import { ChatType } from "../../types/appTypes";
import { PostType } from "../../types/postTypes";
import { User } from "../../types/userTypes";
import { appStore } from "../../zustand/appStore";
import { chatStore } from "../../zustand/chatStore"
import { postStore } from "../../zustand/postStore";
import { userStore } from "../../zustand/userStore";

export async function renderChat(id: string): Promise<{ otherUser: User; chat: ChatType; post: PostType }> {
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

        await appState.getUserById(otherUserId); 
        await postState.getPostById(appState.selectedChat.postId); 
    }

    return {
        otherUser: appState.selectedUser!,
        chat: appState.selectedChat!,
        post: appState.selectedPost!,
    };
}