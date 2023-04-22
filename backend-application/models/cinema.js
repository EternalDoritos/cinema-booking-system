const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
  cinemaNumber: {
    type: Number,
    required: true,
  },
  maxSeat: {
    type: Number,
    required: true,
  },
  seatingArrangement: [
    {
      date: { type: String, required: true },
      time: { type: Number },
      seatTaken: { type: Number, required: true },
      movie: { type: Schema.Types.ObjectId, ref: "Movie" },
      layout: [
        {
          seat0: { type: Boolean },
          seat1: { type: Boolean },
          seat2: { type: Boolean },
          seat3: { type: Boolean },
          seat4: { type: Boolean },
          seat5: { type: Boolean },
          seat6: { type: Boolean },
          seat7: { type: Boolean },
          seat8: { type: Boolean },
          seat9: { type: Boolean },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Cinema", cinemaSchema);
