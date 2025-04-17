require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

// import routes
const movieRouter = require("./src/routes/movie_router");

const app = express();

app.use(cors());
app.use(express.json());

app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
