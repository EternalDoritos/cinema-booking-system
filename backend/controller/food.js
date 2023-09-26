const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Food = require("../models/food");

//@desc GET all food items
//@route GET /food
//@access public
exports.getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

//@desc POST a food item
//@route POST /food
//@access private
exports.postFoods = asyncHandler(async (req, res) => {
  const foodExist = await Food.findOne({ name: req.body.name });

  if (foodExist) {
    res.status(400);
    throw new Error("Food item already exist");
  }

  console.log(req.body);

  const food = await Food.create({
    name: req.body.name,
    //description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });

  res.status(200).json(food);
});

//@desc PATCH a food item
//@route PATCH /food
//@access private

exports.patchFood = asyncHandler(async (req, res) => {
  const food = await Food.findByIdAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    }
  );

  res.status(200).json(food);
});

//@desc GET a single food item based on id
//@route POST /food/:foodId
//@access public
exports.getFoodId = asyncHandler(async (req, res) => {
  const foodId = req.params.foodId;
  const food = await Food.findById(foodId);
  res.status(200).json(food);
});

//@desc POST an order
//@route POST /order
//@access public
exports.postOrder = asyncHandler(async (req, res) => {
  //const { foods, movieId, totalPrice } = req.body;

  // Create an order for the food items and movie tickets
  const order = await Food.create({
    name: req.body.name,
    price: req.body.price,
  });

  res.status(200).json(order);
});

//@desc     DELETE a single food item based on id
//@route    DELETE/food
//@access   private

exports.deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findByIdAndDelete({ _id: req.body.id });

  res.status(200).json(food);
});
