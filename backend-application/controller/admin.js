const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Listing = require("../models/listing");

//@desc     Get summary report based off selected movie
//@route    POST/summaryReportMovie
//@access   private

exports.summaryReportMovie = async (req, res) => {
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
    revenue =
      !movies.discountedPriceBooked || movies.discountedPriceBooked === 0
        ? revenue
        : revenue - 2 * movies.discountedPriceBooked;
    grandTotalMovie += revenue;

    const dateArr = movies.date.toString().split(" ");
    const updatedDate = `${dateArr[2]} - ${dateArr[1]} - ${dateArr[3]}`;
    const movieDetail = {
      movieName: movies.movie.name,
      movieDate: updatedDate,
      movieTime: movies.time,
      location: movies.cinema.location,
      revenue: revenue,
    };
    movieReport.push(movieDetail);
  }
  movieReport.push({
    grandTotalMovie,
  });

  res.status(200).json(movieReport);
};

exports.summaryReportDate = async (req, res) => {
  //get by date
  const currDate = req.body.date;
  const listingDate = await Listing.find({
    date: { $gte: `${currDate}T00:00:00Z`, $lte: `${currDate}T23:59:59Z` },
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
    revenue =
      !movies.discountedPriceBooked || movies.discountedPriceBooked === 0
        ? revenue
        : revenue - 2 * movies.discountedPriceBooked;

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
  res.status(200).json(dateReport);
};
