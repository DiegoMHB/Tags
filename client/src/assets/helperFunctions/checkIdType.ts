import { PostType } from "../../types/postTypes"


export function checkIdType(id : string,userPostsList:PostType[] ) : boolean{
    const verify : boolean  = userPostsList.some(post=> post.id == id)
    return verify
}

