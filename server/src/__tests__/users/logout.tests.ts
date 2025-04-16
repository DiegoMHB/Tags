import request from "supertest";
import app from "../../app";
import db from "../../config/db";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await db.sync({ force: true });
  const userData = {
    name: "Test",
    userName: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@mail.com`,
    city: "Berlin",
    profilePicture: "default.jpg"
};

await request(app).post("/register").send(userData);

 const loginData = {
        email: "test1@mail.com",
        password: "123456",
    };

    await request(app).post("/login").send(loginData);
});

afterAll(async () => {
  await db.close();
});

describe("POST /logout", () => {
  it("should clear the cookie and respond with message", async () => {

   
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
