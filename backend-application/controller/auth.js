const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const bcrypt = require("bcryptjs");

//@desc     Register a new user
//@route    POST/register
//@access   public

exports.register = async (req, res) => {
  const userName = req.body.userName;

  //check if user exist
  const userExist = await User.findOne({ username: userName });

  if (userExist)
    return res.status(400).json({ message: "Username already taken" });

  if (req.body.password.length < 6)
    return res.status(400).json({ message: "Password less than 6 characters" });

  bcrypt.hash(req.body.password, 10).then(async (hash) => {
    await User.create({
      username: userName,
      password: hash,
      userType: req.body.userType,
      loyaltyPoints: 0,
    })
      .then((user) =>
        res.status(200).json({
          message: "User created successfully",
          user,
        })
      )
      .catch((err) =>
        res.status(400).json({
          message: "User not created",
          error: err.message,
        })
      );
  });
};

//@desc     Check user for log in credentials
//@route    POST/login
//@access   public
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          res.status(200).json({
            message: "Log in successful",
            user,
          });
        } else {
          res.status(400).json({
            message: "Login not successful",
            error: "Incorrect password",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
