const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  maxSeating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cinema", cinemaSchema);
