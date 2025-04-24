const { model } = require("../helpers/model");
const table = "user_movie";

const addMovieToUserModel = (username, movieId) => {
  const query = `
        INSERT INTO ${table} (username, movie_id) VALUES (?, ?)`;
  const values = [username, movieId];
  return model(query, values);
};

module.exports = {
  addMovieToUserModel,
};
