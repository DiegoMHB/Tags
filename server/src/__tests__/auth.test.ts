import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../app"
import db from "../config/db"



beforeAll(async () => {
    await db.sync({ force: true })
    jest.useFakeTimers()
})

afterAll(async () => {
    jest.useRealTimers(); 
    await db.close();
})


describe("AUTHENTICATION", () => {

    let user: any;

    it("/register: registers a user and returns a cookie and user data", async () => {
        const userData = {
            name: "Test",
            userName: `testuser_${Date.now()}`,
            email: `test_${Date.now()}@email.com`,
            city: "Berlin",
            profilePicture: "default.jpg",
            password: "123456"
        };

        const res = await request(app).post("/register").send(userData);
        user = res.body.user

        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe(userData.email);
        expect(res.body.message).toBe("Login successfull");
        expect(res.headers["set-cookie"]).toBeDefined();
    });


    it("/register: if email already in use response with 400", async () => {

        const userData = {
            name: "Diego Martin",
            userName: "Diegui",
            email: user.email,
            city: "Barcelona",
            profilePicture: "foto.jpg"
        };

        await request(app).post("/register").send(userData);

        const res = await request(app).post("/register").send(userData);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Email already registered");
    });

    it("/register: if username already in use response with 400", async () => {

        const userData = {
            name: "Diego Martin",
            userName: user.userName,
            email: "test2@email.com",
            city: "Barcelona",
            profilePicture: "foto.jpg"
        };

        await request(app).post("/register").send(userData);

        const res = await request(app).post("/register").send(userData);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Username already registered");
    });



    it("/login: should log in a user and return a token cookie", async () => {
        const loginData = {
            email: user.email,
            password: "123456",
        };

        const res = await request(app).post("/login").send(loginData);

        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe(loginData.email);
        expect(res.body.message).toBe("Login successfull");
        expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("/login: should fail if password is wrong", async () => {
        const loginData = {
            email: user.email,
            password: "wrong-password",
        };

        const res = await request(app).post("/login").send(loginData);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Wrong Password");
    });

    it("/login: should fail if email is not registered", async () => {
        const loginData = {
            email: "notfound@email.com",
            password: "123456",
        };

        const res = await request(app).post("/login").send(loginData);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Email not registered");
    });

    it("/user/:id: should return a user by id", async () => {
        const res = await request(app).get(`/user/${user.id}`);

        expect(res.status).toBe(200);
        expect(res.body.user.id).toBe(user.id);
        expect(res.body.user.email).toBe(user.email);
        expect(res.body.message).toBe("User get");
    });

    it("should return 400 if user not found", async () => {
        const randomId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
        const res = await request(app).get(`/user/${randomId}`);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Couldnt get User from DB");
    });




    it("/logout: should clear the cookie and respond with message", async () => {

        const res = await request(app).get("/logOut");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: 'Cookie deleted, session expired',
            ok: true
        });

        const cookies = res.headers["set-cookie"];
        expect(cookies).toBeDefined();
        expect(cookies[0]).toMatch(/access_token=;/);
        expect(cookies[0]).toMatch(/Expires=Thu, 01 Jan 1970/);
    });
});


