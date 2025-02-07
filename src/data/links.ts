import { linkList } from "../types/appTypes";


export const links: linkList = {
    offline:
        [
            { to: "/", text: "Home", id: 0 },
            { to: "/map", text: "Map", id: 1 },
            { to: "/about", text: "About", id: 4 },
        ],
    online:
        [
            { to: "/map", text: "Map", id: 1 },
            { to: "/profile", text: "Profile", id: 2 },
            { to: "/tags", text: "Tags", id: 3 },
        ]

};