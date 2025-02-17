export type NewPostType = {
    need : "NEED" | "OFFER",
    category : string,
    duration: number,
    title: string,
    description: string,
    pictures? : string
    userId: string,
    coordinates : number[],
}


export type PostType = NewPostType & {
    id: string,
    createdAt: string | null,
    destroyedAt : string

}