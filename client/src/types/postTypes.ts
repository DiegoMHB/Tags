export type newPostType = {
    need : boolean, //need:true, offer:false
    category : string,
    duration: number,
    title: string,
    description: string,
    pictures? : string[]
}


export type PostType = newPostType & {
    id: string,
    userId: string,
    location : number[],
}