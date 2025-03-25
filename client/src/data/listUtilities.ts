import { linkList, Selection } from "../types/appTypes";


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
            { to: "/post", text: "Post", id: 4 },
            { to: "/postForm", text: "New Post", id: 5 },
            { to: "/chat", text: "Chat", id: 6 },
        ]

};


export const cities: Selection[] = [
    { id: 1, value: "Berlin", label: "Berlin" },
    { id: 2, value: "London", label: "London" },
];



export const categories: Selection[] = [
    { id: 1, value: "offer", label: "Offer" },
    { id: 2, value: "need", label: "Need" },
    { id: 3, value: "taxi", label: "Taxi" },
    { id: 4, value: "ticket", label: "Ticket" },
    { id: 5, value: "info", label: "Info" },
]

