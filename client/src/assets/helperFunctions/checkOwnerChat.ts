import { ChatByOwner ,ChatPostNotOwned, ChatPostOwned } from "../../types/appTypes";

// searches in user.chats if theres an open chat for the post

export function checkOwnerChat(chats: ChatByOwner, postId: string):string | string[] | null {
    const notOwned = chats.notOwned;
    const owned = chats.owned;

    for (const post in notOwned as ChatPostNotOwned) {
        if (post == postId) {
            return notOwned![post] 
        }
    }
    for (const post in owned as ChatPostOwned) {
        if (post != null && post == postId) {

            return owned![post] 
        }
    }

    return null;
}

