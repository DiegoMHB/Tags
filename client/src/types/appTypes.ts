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