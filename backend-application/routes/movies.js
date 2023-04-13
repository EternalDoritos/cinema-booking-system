const express = require("express");

const router = express.Router();

const movieController = require("../controller/movies");

//movie => GET
router.get("/", movieController.getMovies);

//movie => POST
router.post("/", movieController.postMovies);

module.exports = router;
