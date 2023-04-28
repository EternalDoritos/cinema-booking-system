const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Cinema = require("../models/cinema");
const Movie = require("../models/movies");

//@desc    GET all details of all the cinema
//@route    GET/cinema
//@access   private
exports.getCinema = asyncHandler(async (req, res) => {
  const cinema = await Cinema.find();
  res.json(cinema);
});

// //@desc     GET all cinema details of movie based off movie id
// //@route    POST/cinema/detail
// //@access   private
// exports.getCinemaMovieDetail = asyncHandler(async (req, res) => {
//   const id = new mongoose.Types.ObjectId(req.body.id);
//   const cinema = await Cinema.find({
//     "seatingArrangement.movie": req.body.id,
//   }).populate({ path: "seatingArrangement.movie" });

//   res.json(cinema);
// });

// //@desc     GET all cinema details of movie based off movie id and time
// //@route    POST/cinema/time
// //@access   private
// exports.getCinemaMovieTime = asyncHandler(async (req, res) => {
//   const id = new mongoose.Types.ObjectId(req.body.id);
//   const cinema = await Cinema.find({
//     seatingArrangement: {
//       $elemMatch: {
//         movie: req.body.id,
//         time: req.body.time,
//         date: req.body.date,
//       },
//     },
//   }).populate({ path: "seatingArrangement.movie" });
//   res.json(cinema);
// });

//@desc     POST a new cinema
//@route    POST/cinema
//@access   private
exports.postCinema = asyncHandler(async (req, res) => {
  const cinema = await Cinema.create({
    location: req.body.location,
    maxSeating: req.body.seating,
  });
  res.status(200).json(cinema);
});

//@desc   UPDATE current cinema details
//@route  PATCH/cinema
//@access private
exports.patchCinema = asyncHandler(async (req, res) => {
  const cinema = await Cinema.findByIdAndUpdate(
    { _id: req.body.id },
    {
      location: req.body.location,
      maxSeating: req.body.seating,
    }
  );
  res.status(200).json(cinema);
});

//@desc   DELETE current cinema
//@route  DELETE/cinema
//@access private
exports.deleteCinema = asyncHandler(async (req, res) => {
  const cinema = await Cinema.findByIdAndDelete({ _id: req.body.id });
  res.status(200).json(cinema);
});

// exports.postMovieListing = asyncHandler(async (req, res) => {
//   let cinema = await Cinema.findOneAndUpdate(
//     { cinemaNumber: req.body.number },
//     {
//       $push: {
//         seatingArrangement: {
//           date: req.body.date,
//           time: req.body.time,
//           seatTaken: 0,
//           movie: req.body.movie,
//           layout: [
//             { seat0: 0 },
//             { seat1: 0 },
//             { seat2: false },
//             { seat3: false },
//             { seat4: false },
//             { seat5: false },
//             { seat6: false },
//             { seat7: false },
//             { seat8: false },
//             { seat9: false },
//           ],
//         },
//       },
//     },
//     { new: true }
//   );
//   res.json(cinema);
// });
