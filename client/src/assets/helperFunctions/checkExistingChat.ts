

// searches in user.chats if theres an open chat for the post

import { ChatListElement, PostType } from "../../types/postTypes";

export async function checkExistingChat(userId: string, post: PostType): Promise<ChatListElement | null> {
    const chat =  post.chatList.find(chat => chat.notOwnerId === userId);
    return chat? chat : null;
}

