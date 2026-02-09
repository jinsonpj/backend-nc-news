const { selectTopics } = require("../models/topics.model");

exports.fetchTopics = () => {
  return selectTopics();
};
