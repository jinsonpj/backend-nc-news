const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: responds with an object with key topics and value of array of topics", async () => {
    const res = await request(app).get("/api/topics").expect(200);

    expect(res.body).toHaveProperty("topics");
    expect(Array.isArray(res.body.topics)).toBe(true);

    if (res.body.topics.length > 0) {
      const topic = res.body.topics[0];
      expect(topic).toHaveProperty("slug");
      expect(topic).toHaveProperty("description");
    }
  });
});

describe("GET /api/articles", () => {
  test("200: responds with an array of articles", async () => {
    const res = await request(app).get("/api/articles").expect(200);

    expect(res.body).toHaveProperty("articles");
    expect(Array.isArray(res.body.articles)).toBe(true);

    if (res.body.articles.length > 0) {
      const article = res.body.articles[0];
      expect(article).toHaveProperty("article_id");
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("author");
      expect(article).toHaveProperty("topic");
      expect(article).toHaveProperty("created_at");
      expect(article).toHaveProperty("votes");
      expect(article).toHaveProperty("article_img_url");
      expect(article).toHaveProperty("comment_count");
      expect(article).not.toHaveProperty("body");
    }
  });
});
