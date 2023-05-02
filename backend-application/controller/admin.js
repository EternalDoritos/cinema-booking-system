const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Listing = require("../models/listing");

//@desc     Get summary report based off requirement
//@route    POST/summaryReport
//@access   private

exports.summaryReport = async (req, res) => {
  const summaryReport = [];

  //get by date
  const listingDate = await Listing.find({
    date: { $gte: req.body.date },
  })
    .populate("movie")
    .populate("cinema");

  //get summary of each movie and the total revenue earn for the date

  const dateReport = [];
  let grandTotalDate = 0;
  for (let movies of listingDate) {
    let revenue = 0;
    movies.seating.forEach((element) => {
      if (element) revenue += 12;
    });
    grandTotalDate += revenue;

    const movieDetail = {
      movieName: movies.movie.title,
      movieTime: movies.time,
      location: movies.cinema.location,
      revenue: revenue,
    };
    dateReport.push(movieDetail);
  }
  dateReport.push({
    grandTotalDate,
  });

  //get by movie
  const listingMovie = await Listing.find({
    movie: req.body.movie,
  })
    .populate("movie")
    .populate("cinema");

  //get summary of each movie and total revenue for the movie
  const movieReport = [];
  let grandTotalMovie = 0;
  for (let movies of listingMovie) {
    let revenue = 0;
    movies.seating.forEach((element) => {
      if (element) revenue += 12;
    });
    grandTotalMovie += revenue;

    const movieDetail = {
      movieDate: movies.date,
      movieTime: movies.time,
      location: movies.cinema.location,
      revenue: revenue,
    };
    movieReport.push(movieDetail);
  }
  movieReport.push({
    grandTotalMovie,
  });
  summaryReport.push(dateReport);
  summaryReport.push(movieReport);

  res.status(200).json(summaryReport);
};
