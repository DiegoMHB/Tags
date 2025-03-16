import { LatLngTuple } from "leaflet"

export type NewPostType = {
    category: string
    duration: number
    title: string
    description: string
    picture?: string
    userId: string
    coordinates: LatLngTuple
}


export type PostType = NewPostType & {
    id: string
    createdAt: string
    destroyAt: string
    isActive: boolean
    chatList: ChatListElement[]//ids de los chats

}

export type ChatListElement = {
    notOwnerId: string,
    chatId: string
}

export type ChatType = {
    id: string
    notOwnerId: string
    ownerId: string
    messages: Message[]
    postId: string
}

export type Message = {
    userName: string
    date: string
    content: string
}