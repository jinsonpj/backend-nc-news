const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

module.exports = app;
