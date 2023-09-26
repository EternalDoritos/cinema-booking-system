const express = require("express");

const router = express.Router();

const cinemaController = require("../controller/cinema");

//cinema -> GET
router.get("/", cinemaController.getCinema);
router.get("/:cinemaId", cinemaController.getOneCinema);

//cinema -> POST
router.post("/", cinemaController.postCinema);
//router.post("/details", cinemaController.getCinemaMovieDetail);
//router.post("/timing", cinemaController.getCinemaMovieTime);
//router.post("/listing", cinemaController.postMovieListing);

//cinema -> PATCH
router.patch("/", cinemaController.patchCinema);

//cinema -> DELETE
router.delete("/", cinemaController.deleteCinema);
module.exports = router;
