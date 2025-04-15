import request from "supertest";
import db from "../config/db";
import app from "../app";


describe("Server", () => {
    it("Response with status if request GET to `/` ", async () => {
        const response = await request(app).get("/");
        expect([200, 404]).toContain(response.statusCode); 
    });
});


describe("Database Connection", () => {
  it("should connect successfully to the database", async () => {
    await expect(db.authenticate()).resolves.not.toThrow();
  });
});
