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


