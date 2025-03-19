
import { ChatType } from "../../types/appTypes";
import { PostType } from "../../types/postTypes";
import { User } from "../../types/userTypes";
import { appStore } from "../../zustand/appStore";
import { chatStore } from "../../zustand/chatStore"
import { postStore } from "../../zustand/postStore";
import { userStore } from "../../zustand/userStore";

export async function renderChat(id: string): Promise<{ otherUser: User, chat: ChatType, post: PostType }> {

    const { selectedChat, getChatById } = chatStore()
    const { user } = userStore()
    const { selectedUser, getUserById } = appStore()
    const { selectedPost, getPostById } = postStore()

    await getChatById(id);
    console.log(selectedChat, 'en funcion')
    if (selectedChat) {

        const otherUser =
            user.id == selectedChat!.ownerId
                ? selectedChat!.notOwnerId
                : selectedChat!.ownerId;
        await getUserById(otherUser);
        await getPostById(selectedChat.postId)

    }
    return { otherUser: selectedUser!, chat: selectedChat!, post: selectedPost! }
} 