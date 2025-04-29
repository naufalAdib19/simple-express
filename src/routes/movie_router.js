const { Router } = require("express");

// controller
const { getMovies } = require("../controllers/movie_controller");
const { getMovie } = require("../controllers/movie_controller");
const { createMovie } = require("../controllers/movie_controller");
const { deleteMovie } = require("../controllers/movie_controller");
const { editMovie } = require("../controllers/movie_controller");

const { registerUser, verifyOTP } = require("../controllers/user_controller");
const { loginUser } = require("../controllers/user_controller");
const { sendOTP } = require("../controllers/user_controller");

const { addMovieToUser } = require("../controllers/user_movie_controller");

const router = Router();

// import middleware
const { auth } = require("../middlewares/auth");

// routers
router.get("/api/movie", auth, getMovies);
router.post("/api/movie", createMovie);
router.delete("/api/movie/:id", deleteMovie);
router.put("/api/movie/:id", editMovie);
router.get("/api/movie/:id", getMovie);

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);

router.post("/api/send-otp", auth, sendOTP);
router.post("/api/verify-otp", auth, verifyOTP);

router.post("/api/add-movie-to-user", auth, addMovieToUser);

module.exports = router;
