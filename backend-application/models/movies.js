const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  reviewsAndRatings: [
    {
      name: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      reviews: {
        type: String,
        required: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
