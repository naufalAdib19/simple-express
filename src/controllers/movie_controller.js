const response = require("../helpers/response");

const { getMoviesModel } = require("../models/movie_model");
const { createMovieModel } = require("../models/movie_model");
const { deleteMovieModel } = require("../models/movie_model");
const { editMovieModel } = require("../models/movie_model");

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

const createMovie = async (req, res) => {
  try {
    const result = await createMovieModel(req.body);
    return response(res, "Success", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const result = await deleteMovieModel(req.params.id);
    return response(res, "Success", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

const editMovie = async (req, res) => {
  try {
    const result = await editMovieModel(req.params.id, req.body);
    return response(res, "Success", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

module.exports = { getMovies, createMovie, deleteMovie, editMovie };
