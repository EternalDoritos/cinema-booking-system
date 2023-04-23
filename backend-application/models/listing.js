const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinema: {
    type: mongoose.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  seating: [
    {
      type: Boolean,
    },
  ],
  date: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Listing", listingSchema);
