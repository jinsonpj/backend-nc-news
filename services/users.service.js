const { selectUsers } = require("../models/users.model");

exports.fetchUsers = () => {
  return selectUsers();
};
