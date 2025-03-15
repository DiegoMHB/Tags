

// searches in user.chats if theres an open chat for the post

import { PostType } from "../../types/postTypes";

export function checkExistingChat(userId: string, post: PostType): string | null {
    const chat = post.chatList.find(chat => chat.notOwner === userId);
    return chat ? chat.chatId : null;
}

