const { selectArticleById } = require("../models/articles.model");
const {
  selectCommentsByArticleId,
  insertComment,
} = require("../models/comments.model");

exports.fetchCommentsByArticleId = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return selectArticleById(article_id).then((article) => {
    if (!article) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return selectCommentsByArticleId(article_id);
  });
};

exports.addCommentByArticleId = (article_id, username, body) => {
  if (isNaN(article_id) || !username || !body) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return insertComment(article_id, username, body);
};
