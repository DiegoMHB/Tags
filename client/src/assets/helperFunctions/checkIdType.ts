import { PostType } from "../../types/postTypes"


export function checkIdType(id : string,userPostsList:PostType[] ) : boolean{
    console.log(userPostsList, id)
    const verify : boolean  = userPostsList.some(post=> post.id == id)
    console.log(verify)
    return verify
}

