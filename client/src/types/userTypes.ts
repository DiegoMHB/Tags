export type NewUser = {
    name: string
    userName :string
    email : string
    password : string
    city : string
    profilePicture: null | string
    post : string
}

export type User = NewUser	& {
    id: string
    createdAt: string | null

}