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
      customerType: req.body.customerType,
      loyaltyPoints: 0,
      isActive: true,
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

//@desc     Get all users
//@route    GET/getUsers
//@access   public

exports.getUsers = async (req, res) => {
  const users = await User.find();
  // const users = await User.find().select({ _id: 0, username: 1 });
  res.status(200).json(users);
};

//@desc     Edit user
//@route    GET/editUser
//@access   public

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { username, userType, customerType, email, loyaltyPoints} = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, userType, customerType, email, loyaltyPoints},
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};


//@desc     Get user by ID
//@route    PUT/getUserById
//@access   public

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

//@desc     Suspend user access by ID
//@route    PUT/suspendUserAccess
//@access   public

exports.suspendUserAccess = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { hasAccess: false },
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User access suspended successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

//@desc     Resume user access by ID
//@route    PUT/resumeUserAccess
//@access   public

exports.resumeUserAccess = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { hasAccess: true },
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User access resume successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

//@desc     Grant user access by ID
//@route    PUT/suspendUser
//@access   public

exports.grantUserAccess = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User access granted successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
//@desc     Check user for log in credentials
//@route    POST/login
//@access   public
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
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
