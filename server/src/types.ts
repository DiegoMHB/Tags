export type ChatListElement = {
    notOwnerId: string,
    chatId: string
}

export type Message = {
    owner: string,
    date: string,
    content: string,
    id:string
}

export type Context = {
    owner: userContext,
    notOwner: userContext,
    post: postContext
 }

 type userContext = {
    userName:string,
    profilePic:string
 }
 
 type postContext = {
    id:string,
    title:string,
    category:string,
    picture:string,
    createdAt: Date
 }