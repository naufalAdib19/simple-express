const response = require("../helpers/response");
const db = require("../helpers/db");

const addMovieToUser = async (req, res) => {
  const currentUser = req.user.username;
  const bookdId = req.body.bookId;

  const connection = await db.getConnection();

  try {
    // begin the transaction
    await connection.beginTransaction();

    // get book based on id with FOR UPDATE
    const [book] = await connection.query(
      "SELECT * FROM movies WHERE id = ? FOR UPDATE",
      [bookdId]
    );

    // Check if book is exist
    if (!book.length) {
      return response(res, "Book not found", 400, false, null);
    }

    // Check book stock
    if (book[0]?.stock <= 0) {
      return response(res, "Book out of stock", 400, false, null);
    }

    // simulate race conditions
    await new Promise((resolve) => setTimeout(resolve, 1000));

    /* add book to user */
    const result = await connection.query(
      "INSERT INTO user_movie (username, movie_id) VALUES (?, ?)",
      [currentUser, bookdId]
    );
    await connection.query("UPDATE movies SET stock = stock - 1 WHERE id = ?", [
      bookdId,
    ]);

    await connection.commit();
    return response(res, "Success", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

module.exports = {
  addMovieToUser,
};
