

// searches in user.chats if theres an open chat for the post

import { ChatListElement, PostType } from "../../types/postTypes";
import { chatStore } from "../../zustand/chatStore";

export  function checkExistingChat(userId: string, post: PostType): ChatListElement | null {
    const chat =  post.chatList.find(chat => chat.notOwnerId === userId);
    if (chat){
        const chatId = chat.chatId
        chatStore.getState().getChatById(chatId)
    }
    return chat? chat : null;
}

