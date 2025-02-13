export type NewUser = {
    name: string
    userName :string
    email : string
    password : string
    city : string
    profilePicture: null | string
    createdAt: string
}

export type User = NewUser	& {
    id: string

}