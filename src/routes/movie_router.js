const { Router } = require("express");
const { getMovies } = require("../controllers/movie_controller");

const router = Router();

router.get("/api/movie", getMovies);

module.exports = router;
