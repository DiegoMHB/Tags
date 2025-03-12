export type ChatPostOwned = {
    [chatId: string]: string[];
};

export type ChatPostNotOwned = {
    [chatId: string]: string;
};

export type ChatsType = {
    owned: ChatPostOwned | null;
    notOwned: ChatPostNotOwned | null;
};