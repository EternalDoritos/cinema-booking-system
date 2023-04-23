const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Listing = require("../models/listing");
const { restart } = require("nodemon");

//@desc     GET all the current listings of the movie
//@route    GET/listing/:id
//@access   private
exports.getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.find({ movie: req.params.id })
    .populate("cinema")
    .populate("movie");
  res.status(200).json(listing);
});

//@desc     POST a new listing of a movie
//@route    POST/listing
//@access   private
exports.postListing = asyncHandler(async (req, res) => {
  const exist = await Listing.findOne({
    cinema: req.body.cinema,
    time: req.body.time,
    date: req.body.date,
  });

  if (exist) {
    res.status(400);
    throw new Error("There is already a movie screening at selected time slot");
  }

  const seating = new Array(15).fill(false);
  const listing = await Listing.create({
    movie: req.body.movie,
    cinema: req.body.cinema,
    seating: seating,
    date: req.body.date,
    time: req.body.time,
  });
  res.status(200).json(listing);
});
