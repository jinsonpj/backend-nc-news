const { selectArticleById } = require("../models/articles.model");
const {
  selectCommentsByArticleId,
  insertComment,
  deleteComment,
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

exports.deleteCommentById = (comment_id) => {
  if (isNaN(comment_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return deleteComment(comment_id).then((result) => {
    if (!result) {
      return Promise.reject({ status: 404, msg: "Comment not found" });
    }
    return;
  });
};
