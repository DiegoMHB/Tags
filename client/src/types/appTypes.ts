

export type link = {
    id:number
    to:string
    text:string
}

export type linkList = {
    online : link[]
    offline : link[]
}

export type LoginForm = {
    email : string
    password: string
}

export type Selection = {
    label:string,
    id:number,
    value:string
}


export type TimeLeft = {
    minutes: number,
    percentage: number
}

export type ChatType = {
    id: string
    postId: string
    context:Context
    messages: Message[]
}
export type Message = {
    ownerId: string
    date: string
    content: string,
    id: string
}

type Context = {
    owner: userContext,
    notOwner: userContext,
    post: postContext
 }

 type userContext = {
    userName:string,
    profilePic:string
 }
 
 type postContext = {
    category:string,
    picture:string,
    createdAt: Date
 }

