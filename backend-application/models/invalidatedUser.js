const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invalidatedUserSchema = new Schema({
  fullName: { type: String, required: true, minLength: 6, maxLength: 50 },
  userName: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  isValidated: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("InvalidatedUser", invalidatedUserSchema);
