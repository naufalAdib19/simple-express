const model = require("../helpers/model");
const table = "movies";

const getMoviesModel = () => {
  const query = "SELECT * FROM " + table;
  return model(query);
};

module.exports = { getMoviesModel };
