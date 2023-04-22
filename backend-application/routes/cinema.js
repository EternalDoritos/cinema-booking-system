const express = require("express");

const router = express.Router();

const cinemaController = require("../controller/cinema");

//cinema -> GET
router.get("/", cinemaController.getCinema);

//cinema -> POST
router.post("/", cinemaController.postCinema);
router.post("/details", cinemaController.getCinemaMovieDetail);
router.post("/timing", cinemaController.getCinemaMovieTime);
router.post("/listing", cinemaController.postMovieListing);
module.exports = router;
