import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../../app"
import db from "../../config/db"
import {postsArray} from "../../dev/defaultPosts"

let post :any;

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
    post = {...postsArray[0], userId:res.body.user.id};
})

afterAll(async () => {
    await db.close();
})

describe("POST /newPost", () => {

    it("creates a new post in db and sends a status 200 back", async () => {
        
        const res = await request(app).post("/newPost").send(post);

        expect(res.status).toBe(200);
        expect(res.body.post).toBeDefined()
        expect(res.body.message).toBe("Post succesfully created")

    });

    it("should fail if a required field is missing", async ()=> {
        const invalidPost = {...post};
        delete invalidPost.title

        const res = await request(app).post("/newPost").send(invalidPost)

        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined()
    });

    it("should add the post ID to the user's posts array", async () => {
        const res = await request(app).post("/newPost").send(post);
        const userId = post.userId;
    
        const userRes = await request(app).get(`/user/${userId}`);
    
        expect(userRes.body.user.posts).toContain(res.body.post.id);
    });
})