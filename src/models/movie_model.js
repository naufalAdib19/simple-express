const model = require("../helpers/model");
const table = "movies";

const getMoviesModel = () => {
  const query = "SELECT * FROM " + table;
  return model(query);
};

const createMovieModel = (data) => {
  const query = `
    INSERT INTO movies (name, release_date, price, author)
    VALUES (?, ?, ?, ?)
  `;

  const values = [data?.name, data?.release_date, data?.price, data?.author];

  return model(query, values);
};

const deleteMovieModel = (id) => {
  const query = `
    DELETE FROM ${table}
    WHERE id = ?
  `;
  return model(query, id);
};

module.exports = { getMoviesModel, createMovieModel, deleteMovieModel };
