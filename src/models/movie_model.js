const { model } = require("../helpers/model");
const table = "movies";

const getMoviesModel = () => {
  const query = "SELECT * FROM " + table;
  return model(query);
};

const getMovieModel = (id) => {
  const query = "SELECT * FROM " + table + " WHERE id = ? FOR UPDATE";
  return model(query, id);
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

const editMovieModel = (id, data) => {
  const query = `
    UPDATE ${table}
    SET name = ?, release_date = ?, price = ?, author = ?
    WHERE id = ?
  `;
  const values = [
    data?.name,
    data?.release_date,
    data?.price,
    data?.author,
    id,
  ];
  return model(query, values);
};

const updateStockMovieModel = (id) => {
  const query = `
    UPDATE ${table}
    SET stock = stock - 1
    WHERE id = ?
  `;
  const values = [id];
  return model(query, values);
};

module.exports = {
  getMoviesModel,
  getMovieModel,
  createMovieModel,
  deleteMovieModel,
  editMovieModel,
  updateStockMovieModel,
};
