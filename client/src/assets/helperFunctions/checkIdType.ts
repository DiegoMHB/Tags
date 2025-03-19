import { PostType } from "../../types/postTypes"


export function checkIdType(id: string, authUserPostsList: PostType[]): boolean {
    const verify: boolean = authUserPostsList.some(post => post.id == id)
    return verify
}

