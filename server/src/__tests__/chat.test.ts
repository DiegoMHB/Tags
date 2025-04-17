import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../app"
import db from "../config/db"
import { postsArray } from "../dev/defaultPosts"

let post1: any;
let post2: any;
let post3: any;
let ownerId: string;
let notOwnerId: string;
let chatId1: string


beforeAll(async () => {
    await db.sync({ force: true })
    jest.useFakeTimers()

    const userData1 = {
        name: "Test1",
        userName: `testuser1`,
        email: `test1@mail.com`,
        city: "Berlin",
        profilePicture: "default.jpg"
    };
    const userData2 = {
        name: "Test2",
        userName: `testuser2`,
        email: `test2@mail.com`,
        city: "Berlin",
        profilePicture: "default.jpg"
    };

    const res1 = await request(app).post("/register").send(userData1);
    ownerId = res1.body.user.id;
    const res2 = await request(app).post("/register").send(userData2);
    notOwnerId = res2.body.user.id;
    post1 = { ...postsArray[0], userId: ownerId };
    post2 = { ...postsArray[1], userId: ownerId };
    post3 = { ...postsArray[2], userId: ownerId };


    const p1Res = await request(app).post("/newPost").send(post1);
    post1 = p1Res.body.post;
    const p2Res = await request(app).post("/newPost").send(post2);
    post2 = p2Res.body.post;
    const p3Res = await request(app).post("/newPost").send(post3);
    post3 = p3Res.body.post;



})

afterAll(async () => {
    jest.useRealTimers(); 
    await db.close();
})

describe("chats", () => {

    it("/newChat: creates a new chat in db and sends a status 200 back and chat data", async () => {

        const ownerRes = await request(app).get(`/user/${ownerId}`);
        ownerId = ownerRes.body.user.id;
        const notOwnerRes = await request(app).get(`/user/${notOwnerId}`);
        notOwnerId = notOwnerRes.body.user.id;

        const res = await request(app).post("/newChat").send({ postId: post1.id, ownerId, notOwnerId });
        chatId1 = res.body.chat.id
        expect(res.status).toBe(200);
        expect(res.body.post).toBeDefined();
        expect(res.body.chat).toBeDefined();
        expect(res.body.message).toBe("Chat succesfully created");

    });


    it("/newChat: should fail if required fields are missing", async () => {
        const res = await request(app).post("/newChat").send({ ownerId });

        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });


    it("/newChat: should update post.chatList with new chat info", async () => {
        const res = await request(app).post("/newChat").send({
            postId: post2.id,
            ownerId,
            notOwnerId
        });

        expect(res.status).toBe(200);
        expect(res.body.post).toBeDefined();
        expect(res.body.chat).toBeDefined();

        const updatedPost = res.body.post;

        expect(Array.isArray(updatedPost.chatList)).toBe(true);
        expect(updatedPost.chatList.length).toBeGreaterThan(0);

        const chatInList = updatedPost.chatList.find(
            (el: any) => el.chatId === res.body.chat.id
        );

        expect(chatInList).toBeDefined();
        expect(chatInList.notOwnerId).toBe(notOwnerId);
    });

    it("/getChatById/:id: should return a chat if the ID exists", async () => {
        const newChatRes = await request(app).post("/newChat").send({
            postId: post3.id,
            ownerId,
            notOwnerId
        });

        expect(newChatRes.status).toBe(200);
        const chatId = newChatRes.body.chat.id;

        const res = await request(app).get(`/getChatById/${chatId}`);

        expect(res.status).toBe(200);
        expect(res.body.chat).toBeDefined();
        expect(res.body.chat.id).toBe(chatId);
        expect(res.body.message).toBe("Chat get");
    });

    it("/postMessage: should add a message in the chat", async () => {

        const message = {
            ownerId,
            date: Date.now(),
            content: "test",
            id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
        };

        const res = await request(app).post("/postMessage").send({ chatId: chatId1, message})
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Message added successfully");
        expect(res.body.chat.messages[res.body.chat.messages.length-1].content).toBe('test')

    });

    it("should return 400 if message content is missing", async () => {
        const invalidMessage = {
            ownerId,
            date: Date.now(),
            id: "cccccccc-cccc-cccc-cccc-cccccccccccc" 
        };
    
        const res = await request(app).post("/postMessage").send({ chatId: chatId1, message: invalidMessage });
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it("/postMessage: should preserve previous messages when adding a new one", async () => {
        const firstMessage = {
            ownerId,
            date: Date.now(),
            content: "Primer mensaje",
            id: "msg-1111-aaaa-bbbb-cccc-1111"
        };
    
        const secondMessage = {
            ownerId,
            date: Date.now() + 1,
            content: "Segundo mensaje",
            id: "msg-2222-aaaa-bbbb-cccc-2222"
        };
    
        const res1 = await request(app).post("/postMessage").send({ chatId: chatId1, message: firstMessage });
        expect(res1.status).toBe(200);
    
        const res2 = await request(app).post("/postMessage").send({ chatId: chatId1, message: secondMessage });
        expect(res2.status).toBe(200);
    
        const chat = res2.body.chat;
        expect(chat.messages).toHaveLength(3);
        expect(chat.messages[1].content).toBe("Primer mensaje");
        expect(chat.messages[2].content).toBe("Segundo mensaje");
    });
    


});