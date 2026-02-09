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

describe("GET /api/users", () => {
  test("200: responds with an object with key users and value of array of topics", async () => {
    const res = await request(app).get("/api/users").expect(200);

    expect(res.body).toHaveProperty("users");
    expect(Array.isArray(res.body.users)).toBe(true);

    if (res.body.users.length > 0) {
      const user = res.body.users[0];
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("avatar_url");
    }
  });
});

// describe("GET /api/invalid-path", () => {
//   test("404: responds with an invalid path message", async () => {
//     const res = await request(app).get("/api/invalid-path").expect(404);

//     expect(res.body).toEqual({ msg: "Invalid Path" });
//   });
// });

describe("Error Handling Tests", () => {
  describe("GET /notARoute", () => {
    test("404: responds with 'Invalid Path' for non-existent endpoint", async () => {
      const res = await request(app).get("/notARoute").expect(404);
      expect(res.body).toEqual({ msg: "Invalid Path" });
    });
  });

  // New tests

  describe("INVALID PATH", () => {
    test("404: invalid path", () => {
      return request(app)
        .get("/api/invalid-path")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid Path");
        });
    });
  });

  describe("GET /api/topics", () => {
    test("200: returns topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toBeInstanceOf(Array);
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    test("200: returns article", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article.article_id).toBe(1);
        });
    });

    test("400: invalid id", () => {
      return request(app)
        .get("/api/articles/not-a-number")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });

    test("404: not found", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    test("200: returns comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeInstanceOf(Array);
        });
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    test("201: posts comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "Nice article" })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.body).toBe("Nice article");
        });
    });

    test("400: bad request", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
});
