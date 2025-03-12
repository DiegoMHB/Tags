export type NewUser = {
    name: string
    userName: string
    email: string
    password: string
    city: string
    profilePicture?: string | null
}

export type User = NewUser & {
    id: string
    createdAt: string | null
    posts: string[]
    chats: ChatByOwner

};

export type ChatByOwner = {
    owned: ChatPostOwned | null,
    notOwned: ChatPostNotOwned | null,
}

export type ChatPostOwned = {
    [chatId: string]: string[];
};

export type ChatPostNotOwned = {
    [chatId: string]: string;
};