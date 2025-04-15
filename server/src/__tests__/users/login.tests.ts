import dotenv from "dotenv";
dotenv.config();
import request from "supertest"
import app from "../../app"
import db from "../../config/db"

beforeAll(async () => {
    await db.sync({ force: true })
    const userData = {
        name: "Diego Martin",
        userName: "Diegui",
        email: "test1@mail.com",
        city: "Barcelona",
        profilePicture: "foto.jpg"
    };

    await request(app).post("/register").send(userData);
})

afterAll(async () => {
    await db.close();
})

describe("POST /login", () => {

    it("should log in a user and return a token cookie", async () => {
        const loginData = {
            email: "test1@mail.com",
            password: "123456",
        };

        const res = await request(app).post("/login").send(loginData);

        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe(loginData.email);
        expect(res.body.message).toBe("Login successfull");
        expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should fail if password is wrong", async () => {
        const loginData = {
            email: "test1@mail.com",
            password: "wrong-password",
        };

        const res = await request(app).post("/login").send(loginData);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Wrong Password");
    });

    it("should fail if email is not registered", async () => {
        const loginData = {
            email: "notfound@mail.com",
            password: "123456",
        };

        const res = await request(app).post("/login").send(loginData);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Email not registered");
    });
});