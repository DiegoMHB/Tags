import Post from "../../models/Post.model";

type SimplifyPost = {
    dateCreated: Date,
    category: string,
    title: string,
    description: string,
    coordinates: number[],
   // contactedBy: string[],
    //succeded: boolean
}


export default function SimplifyPost(post: Post) {
    const SimplifyPost: SimplifyPost = {
        dateCreated: post.createdAt,
        category: post.category,
        title: post.title,
        description: post.description,
        coordinates: post.coordinates
        //contactedBy: [],
        //succeded: boolean
    }
    return JSON.stringify(SimplifyPost)
}