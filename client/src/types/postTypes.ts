import { LatLngTuple } from "leaflet"

export type NewPostType = {
    category: string,
    duration: number,
    title: string,
    description: string,
    picture?: string
    userId: string,
    coordinates: LatLngTuple,
    chats: ChatType[]
}


export type PostType = NewPostType & {
    id: string,
    createdAt: string,
    destroyAt: string
    isActive: boolean

}

export type Message = {
    userName: string,
    date: string,
    content: string,
}
export type ChatType = {
    id: string,
    senderId: string,
    posterId: string,
    messages: Message[],
    postId: string
}