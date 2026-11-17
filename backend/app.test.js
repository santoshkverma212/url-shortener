process.env.NODE_ENV = "test";
const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("./app");
const db = require("./database");

afterAll((done) => {
  db.close(() => {
    const testDbPath = path.resolve(__dirname, "test_urls.db");
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
    done();
  });
});

describe("URL Shortener API Tests", () => {
  let generatedCode = "";

  test("1. Should shorten a valid URL", async () => {
    const res = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "https://google.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("shortCode");
    generatedCode = res.body.shortCode;
  });

  test("2. Should return 400 for an invalid URL", async () => {
    const res = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "invalid-url" });

    expect(res.statusCode).toBe(400);
  });

  test("3. Should redirect to the original URL", async () => {
    const res = await request(app).get(`/${generatedCode}`);
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe("https://google.com");
  });

  test("4. Should return 404 for a non-existent short code", async () => {
    const res = await request(app).get("/unknown123");
    expect(res.statusCode).toBe(404);
  });
});
