const express = require("express");
const topicsRouter = require("./routes/topics.route");
const articlesRouter = require("./routes/articles.route");
const usersRouter = require("./routes/users.routes");
const app = express();

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

module.exports = app;
