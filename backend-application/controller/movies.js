const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

const Movie = require("../models/movies");

//@desc     GET all movie title
//@route    GET /movie
//@access   public
exports.getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
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

//@desc   GET a single movie based on id
//@route  GET /movie/:movieId
//@access public

exports.getMovieId = asyncHandler(async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await Movie.find({ _id: movieId }).populate(
    "reviewsAndRatings.name"
  );
  res.status(200).json(movie);
});

//@desc   PATCH a single movie
//@route  PATCH /movie
//@access private

exports.patchMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    { _id: req.body.id },
    {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      poster: req.body.poster,
    }
  );

  res.status(200).json(movie);
});

//@desc   DELETE a single movie
//@route  DELETE /movie
//@access private

exports.deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndDelete({ _id: req.body.id });

  res.status(200).json(movie);
});

//not tested yet
exports.postReview = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $push: {
        reviewsAndRatings: {
          name: req.body.name,
          reviews: req.body.reviews,
          rating: req.body.rating,
        },
      },
    }
  );
});
