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

    post1 = { ...postsArray[0], userId: res.body.user.id };
    post2 = { ...postsArray[1], userId: res.body.user.id };
    post3 = { ...postsArray[2], userId: res.body.user.id };
    post4 = { ...postsArray[3], userId: res.body.user.id };


}, 15000)

afterAll(async () => {
    await db.close();
})

describe.only("posts", () => {

    it("/newPost: creates a new post in db and sends a status 200 back", async () => {

        const res = await request(app).post("/newPost").send(post1);
        console.log("POST!!!!!!!!!!!!!!!!!!",res.body.post)

        expect(res.status).toBe(200);
        expect(res.body.post).toBeDefined()
        expect(res.body.message).toBe("Post succesfully created")

    });

    it("/newPost: should fail if a required field is missing", async () => {
        const invalidPost = { ...post1 };
        delete invalidPost.title

        const res = await request(app).post("/newPost").send(invalidPost)

        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined()
    });

    it("/newPost: should add the post ID to the user's posts array", async () => {
        const res = await request(app).post("/newPost").send(post2);
        const userId = post1.userId;

        const userRes = await request(app).get(`/user/${userId}`);

        expect(userRes.body.user.posts).toContain(res.body.post.id);
    });

    it("/getAllPosts: returns an array with all posts", async () => {
        const res = await request(app).get("/getAllPosts")

        expect(res.status).toBe(200);
        expect(res.body.posts).toHaveLength(2);
        expect(res.body.posts[0].category).toBe("need")

    });

    it("/deletePost: should delete an existing post and update user.posts", async () => {
        
        const res = await request(app).post("/newPost").send(post3);
        expect(res.status).toBe(200);
        const id = res.body.post.id
      
        const resDelete = await request(app)
          .delete("/deletePost")
          .send({ id });
        expect(resDelete.status).toBe(200);
        expect(resDelete.body.message).toBe("Post deleted");
      
        const resGetDeleted = await request(app).get(`/getPostById/${id}`);
        expect(resGetDeleted.status).toBe(400);
        expect(resGetDeleted.body.error).toBe("Couldnt get POST from DB");
      
        const userPosts = await request(app).get(`/user/${post3.userId}`);
        expect(userPosts.body.user.posts).not.toContain(id);
      });
  
      it("/closePost/:id : should close an existing post", async () => {
        
        const res = await request(app).post("/newPost").send(post4);
        console.log("-------------->",res.body.post)
        expect(res.status).toBe(200);
        expect(res.body.post.isActive).toBe(true);
        const id = res.body.post.id
      
        const resCLose = await request(app).patch(`/closePost/${id}`)

        expect(resCLose.status).toBe(200);
        expect(resCLose.body.message).toBe("Post closed");
        
        const resGetClosed = await request(app).get(`/getPostById/${id}`);
        expect(resGetClosed.status).toBe(200);
        expect(resGetClosed.body.posts.isActive).toBe(false);

      });

      it("/editPost: should edit an existing post", async () => {
        const changes = {category: "info"}
              
        const all = (await request(app).get(`/getAllPosts`))
        expect(all.body.posts[0].category).toBe("need")
        const post = all.body.posts[0]
        console.log(post)
        
        const resGetEdit = await request(app).patch(`/editPost`).send({id:post.id, ...changes})
        expect(resGetEdit.status).toBe(200);
        expect(resGetEdit.body.post.category).toBe("info");

      });
      


})