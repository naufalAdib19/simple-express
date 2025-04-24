const response = require("../helpers/response");

const { addMovieToUserModel } = require("../models/user_movie_model");
const {
  getMovieModel,
  updateStockMovieModel,
} = require("../models/movie_model");

const addMovieToUser = async (req, res) => {
  const currentUser = req.user.username;
  const bookdId = req.body.bookId;

  try {
    const book = await getMovieModel(bookdId);
    if (!book.length) {
      return response(res, "Book not found", 400, false, null);
    }
    if (book[0]?.stock <= 0) {
      return response(res, "Book out of stock", 400, false, null);
    }
    const result = await addMovieToUserModel(currentUser, bookdId);
    await updateStockMovieModel(bookdId);
    return response(res, "Success", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

module.exports = {
  addMovieToUser,
};
