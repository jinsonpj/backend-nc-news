const {
  selectArticles,
  selectArticleById,
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
