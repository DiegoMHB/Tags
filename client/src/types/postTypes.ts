import { LatLngTuple } from "leaflet"

export type NewPostType = {
    category : string,
    duration: number,
    title: string,
    description: string,
    picture? : string
    userId: string,
    coordinates : LatLngTuple,
}


export type PostType = NewPostType & {
    id: string,
    createdAt: string,
    destroyAt : string

}