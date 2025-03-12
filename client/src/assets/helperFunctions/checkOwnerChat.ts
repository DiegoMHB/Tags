import { ChatByOwner, ChatPostNotOwned, ChatPostOwned } from "../../types/userTypes";

export function checkOwnerChat(chats: ChatByOwner, postId: string): { postId: string | string[] } | null {
    const notOwned = chats.notOwned;
    const owned = chats.owned;

    for (const post in notOwned as ChatPostNotOwned) {
        if (post == postId){
            return {postId: notOwned![post]}
        }
    }
    for (const post in owned as  ChatPostOwned) {
        if (post != null && post == postId){
            
            return {postId: owned![post]}
        }
    }

    return null;
}

