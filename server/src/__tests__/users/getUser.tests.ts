import request from "supertest";
import app from "../../app";
import db from "../../config/db";
import User from "../../models/User.model";


let userId: string;

beforeAll(async () => {
  await db.sync({ force: true });

  const user = await User.create({
    name: "Test",
    userName: "testuser",
    email: "test@mail.com",
    password: "123456", // si la guardás encriptada, podrías hacer un hash
    city: "Berlin",
    profilePicture: "default.jpg"
  });

  userId = user.id;
});

afterAll(async () => {
  await db.close();
});

describe("GET /user/:id", () => {
  it("should return a user by id", async () => {
    const res = await request(app).get(`/user/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.user.id).toBe(userId);
    expect(res.body.user.email).toBe("test@mail.com");
    expect(res.body.message).toBe("User get");
  });

  it("should return 400 if user not found", async () => {
    const randomId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
    const res = await request(app).get(`/user/${randomId}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Couldnt get User from DB");
  });
});
