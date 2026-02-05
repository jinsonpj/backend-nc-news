const express = require("express");
const topicsRouter = require("./routes/topics.route");
const articlesRouter = require("./routes/articles.route");
const app = express();

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);

module.exports = app;
