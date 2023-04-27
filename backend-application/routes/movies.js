const express = require("express");

const router = express.Router();

const movieController = require("../controller/movies");

//movie => GET
router.get("/", movieController.getMovies);

//movie => POST
router.post("/", movieController.postMovies);

//movie/:movieId => GET
router.get("/:movieId", movieController.getMovieId);

router.post("/reviews", movieController.postReview);
module.exports = router;
