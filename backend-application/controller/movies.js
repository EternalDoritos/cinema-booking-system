const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

const Movie = require("../models/movies");

//@desc     GET all movie title
//@route    GET /movie
//@access   public
exports.getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

//@desc     POST a movie
//@route    POST /movie
//@access   private

exports.postMovies = asyncHandler(async (req, res) => {
  const movieExist = await Movie.findOne({ title: req.body.title });

  if (movieExist) {
    res.status(400);
    throw new Error("Movie already exist");
  }

  console.log(req.body);

  const movie = await Movie.create({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    poster: req.body.poster,
  });

  res.status(200).json(movie);
});
