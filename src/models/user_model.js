const { model } = require("../helpers/model");
const table = "users";

const getUserModel = (username) => {
  const query = "SELECT * FROM " + table + " WHERE username = ?";
  return model(query, username);
};

const registerUserModel = (data) => {
  const query = `
        INSERT INTO ${table} (username, password)
        VALUES (?, ?)
    `;
  const values = [data?.username, data?.password];
  return model(query, values);
};

module.exports = {
  registerUserModel,
  getUserModel,
};
