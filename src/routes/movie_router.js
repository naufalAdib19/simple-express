const { Router } = require("express");

// controller
const { getMovies } = require("../controllers/movie_controller");
const { createMovie } = require("../controllers/movie_controller");
const { deleteMovie } = require("../controllers/movie_controller");
const { editMovie } = require("../controllers/movie_controller");

const router = Router();

// router
router.get("/api/movie", getMovies);
router.post("/api/movie", createMovie);
router.delete("/api/movie/:id", deleteMovie);
router.put("/api/movie/:id", editMovie);

module.exports = router;
