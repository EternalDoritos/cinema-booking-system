const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  userType: {
    type: String,
    required: true,
  },
  customerType: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hasAccess: {
    type: Boolean,
    required: true,
  },
  loyaltyPoints: Number,
});

module.exports = mongoose.model("User", userSchema);
