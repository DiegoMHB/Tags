

// searches in user.chats if theres an open chat for the post

import { PostType } from "../../types/postTypes";

export function checkExistingChat(userId: string, post: PostType): string | null {
    console.log(userId, post.chatList)
    const chat = post.chatList && post.chatList.find(chat => chat.notOwner === userId);
    console.log(chat,"existe la 2 vet")
    return chat? chat.chatId : null;
}

