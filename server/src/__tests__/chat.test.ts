import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../app"
import db from "../config/db"
import { postsArray } from "../dev/defaultPosts"

let post1: any;
let post2: any;
let post3: any;
let post4: any;
let userId: string;


beforeAll(async () => {
    await db.sync({ force: true })
    jest.useFakeTimers()

    const userData = {
        name: "Test",
        userName: `testuser`,
        email: `test_@mail.com`,
        city: "Berlin",
        profilePicture: "default.jpg"
    };

    const res = await request(app).post("/register").send(userData);
    userId = res.body.user.id
    post1 = { ...postsArray[0], userId: res.body.user.id };
    post2 = { ...postsArray[1], userId: res.body.user.id };
    post3 = { ...postsArray[2], userId: res.body.user.id };
    post4 = { ...postsArray[3], userId: res.body.user.id };


}, 15000)

afterAll(async () => {
    await db.close();
})