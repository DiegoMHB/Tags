import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../../app"
import db from "../../config/db"
import {postsArray} from "../../dev/defaultPosts"

let post1 :any;
let post2 :any;

beforeAll(async () => {
    await db.sync({ force: true })
    jest.useFakeTimers();

    const userData = {
        name: "Test",
        userName: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@mail.com`,
        city: "Berlin",
        profilePicture: "default.jpg"
    };

    const res = await request(app).post("/register").send(userData);
    post1 = {...postsArray[0], userId:res.body.user.id};
    post2 = {...postsArray[1], userId:res.body.user.id};
    await request(app).post("/newPost").send(post1);
    await request(app).post("/newPost").send(post2);
})

afterAll(async () => {
    await db.close();
})

describe("GET /getAllPosts", () => {

    it("returns an array with all posts", async () => {
        const res = await request(app).get("/getAllPosts")

        expect(res.status).toBe(200);
        expect(res.body.posts).toHaveLength(2);
        expect(res.body.posts[0].category).toBe("need")
        
    });

   
})