export type NewPostType = {
    need : "NEED" | "OFFER",
    category : string,
    duration: number,
    title: string,
    description: string,
    pictures? : string
}


export type PostType = NewPostType & {
    id: string,
    userId: string,
    location : number[],
}