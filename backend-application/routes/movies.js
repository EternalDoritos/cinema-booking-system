const express = require("express");

const router = express.Router();

const movieController = require("../controller/movies");

//movie => GET
router.get("/", movieController.getMovies);

//movie => POST
router.post("/", movieController.postMovies);
router.post("/reviews", movieController.postReview);

//movie/:movieId => GET
router.get("/:movieId", movieController.getMovieId);

//movie => PATCH
router.patch("/", movieController.patchMovie);

//movie => DELETE
router.delete("/", movieController.deleteMovie);
module.exports = router;
