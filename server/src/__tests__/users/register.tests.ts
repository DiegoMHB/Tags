import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../../app"
import db from "../../config/db"




beforeAll(async () => {
    await db.sync({ force: true })
})

afterAll(async () => {
    await db.close();
})


describe("POST /register", () => {

    it("registers a user and returns a cookie and user data", async () => {
        const userData = {
            name: "Test",
            userName: `testuser_${Date.now()}`,
            email: `test_${Date.now()}@mail.com`,
            city: "Berlin",
            profilePicture: "default.jpg"
        };

        const res = await request(app).post("/register").send(userData);


        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe(userData.email);
        expect(res.body.message).toBe("Login successfull");
        expect(res.headers["set-cookie"]).toBeDefined();
    });


    it("if email already in use response with 400", async () => {
        const userData = {
            name: "Diego Martin",
            userName: "Diegui",
            email: "test1@mail.com",
            city: "Barcelona",
            profilePicture: "foto.jpg"
        };

        await request(app).post("/register").send(userData);

        const res = await request(app).post("/register").send({
            ...userData,
            userName: "test",
        });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Email already registered" );
    });
 
    it("if username already in use response with 400", async () => {
        const userData = {
            name: "Diego Martin",
            userName: "Diegui",
            email: "test2@mail.com",
            city: "Barcelona",
            profilePicture: "foto.jpg"
        };

        await request(app).post("/register").send(userData);

        const res = await request(app).post("/register").send({
            ...userData,
            userName: "Diegui"
        });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Username already registered");
    });

})



