const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Listing = require("../models/listing");
const Cinema = require("../models/cinema");
const User = require("../models/user");
exports.getListing = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
  res.status(200).json(listings);
});

//@desc   GET listing by id
//@route  GET listingById/:id
//access  private
exports.getListingByListId = asyncHandler(async (req, res) => {
  arr = [];
  const listing = await Listing.find({ _id: req.params.id })
    .populate("cinema")
    .populate("movie");
  console.log(listing);
  for (ele of listing) {
    const day = ele.date.getDate();
    const month = ele.date.getMonth() + 1;
    const year = ele.date.getFullYear();
    newDate = `${day} - ${month} - ${year}`;
    arr.push({
      movie: ele.movie,
      cinema: ele.cinema,
      seating: ele.seating,
      date: newDate,
      time: ele.time,
      listId: ele._id,
    });
  }
  res.status(200).json(arr);
});
//@desc     GET all the current listings of the movie
//@route    GET/listing/:id
//@access   private
exports.getListingByID = asyncHandler(async (req, res) => {
  arr = [];
  const listing = await Listing.find({ movie: req.params.id })
    .populate("cinema")
    .populate("seating")
    .populate("movie");
  console.log(listing);
  for (ele of listing) {
    const day = ele.date.getDate();
    const month = ele.date.getMonth() + 1;
    const year = ele.date.getFullYear();
    newDate = `${day} - ${month} - ${year}`;
    arr.push({
      movie: ele.movie,
      cinema: ele.cinema,
      seating: ele.seating,
      date: newDate,
      time: ele.time,
      listId: ele._id,
    });
  }
  res.status(200).json(arr);
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
  const maxSeat = await Cinema.find(
    { _id: req.body.cinema },
    { _id: 0, maxSeating: 1 }
  );

  const seating = new Array(maxSeat[0].maxSeating).fill(false); //change 15 to cinema quantity
  const listing = await Listing.create({
    movie: req.body.movie,
    cinema: req.body.cinema,
    seating: seating,
    date: req.body.date,
    time: req.body.time,
    discountedPriceBooked: 0,
  });
  res.status(200).json(listing);
});

//@desc     PATCH seating arrangement
//@route    PATCH/listing/seat
//@access   private
exports.patchListing = asyncHandler(async (req, res) => {
  const arr = req.body.booked;
  const existingSeat = await Listing.findOne(
    { _id: req.body.id },
    { seating: 1, _id: 0 }
  );
  for (let ele of arr) {
    existingSeat.seating[ele] = true;
  }

  const prevValue = await Listing.find({ _id: req.body.id }).select({
    _id: 0,
    discountedPriceBooked: 1,
  });
  console.log(prevValue[0].discountedPriceBooked);
  const listing = await Listing.findByIdAndUpdate(
    { _id: req.body.id },
    {
      seating: existingSeat.seating,
      discountedPriceBooked:
        prevValue[0].discountedPriceBooked + req.body.discountedPriceBooked,
    }
  );
  const user = await User.findByIdAndUpdate(
    { _id: req.body.userId },
    {
      $push: {
        seatsBooked: {
          movieList: req.body.id,
          seating: req.body.booked,
        },
      },
    }
  );
  res.status(200).json(listing);
});

//@desc     PATCH listing details
//@route    PATCH/listing
//@access   private

exports.patchListingAll = asyncHandler(async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(
    { _id: req.body.id },
    {
      movie: req.body.movie,
      cinema: req.body.cinema,
      seating: req.body.seating,
      date: req.body.date,
      time: req.body.time,
      discountedPriceBooked: req.body.discountedPriceBooked,
    }
  );

  res.status(200).json(listing);
});

//@desc     DELETE listing details
//@route    DELETE/listing
//@access   private
exports.deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findByIdAndDelete({ _id: req.body.id });
  res.status(200).json(listing);
});
