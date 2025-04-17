const response = require("../helpers/response");

const { getMoviesModel } = require("../models/movie_model");

const getMovies = async (_, res) => {
  try {
    const result = await getMoviesModel();

    if (result.length) {
      return response(res, "Success", 200, true, result);
    }
    return response(res, "No data", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

module.exports = { getMovies };
