const {
  selectArticles,
  selectArticleById,
  updateArticleVotesById,
} = require("../models/articles.model");

exports.fetchArticles = () => {
  return selectArticles();
};

exports.fetchArticleById = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return selectArticleById(article_id).then((article) => {
    if (!article) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return article;
  });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, msg: "inc_votes required" });
  }

  if (typeof inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "inc_votes must be a number" });
  }

  return updateArticleVotesById(article_id, inc_votes).then((article) => {
    if (!article) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return article;
  });
};
