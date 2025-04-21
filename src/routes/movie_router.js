const { Router } = require("express");
const { getMovies } = require("../controllers/movie_controller");
const { createMovie } = require("../controllers/movie_controller");
const { deleteMovie } = require("../controllers/movie_controller");

const router = Router();

router.get("/api/movie", getMovies);
router.post("/api/movie", createMovie);
router.delete("/api/movie/:id", deleteMovie);

module.exports = router;
