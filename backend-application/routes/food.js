const express = require("express");
const router = express.Router();
const foodController = require("../controller/food");

//food => GET
router.get("/", foodController.getFoods);

//food => POST
router.post("/", foodController.postFoods);

//food/:foodId => GET
router.get("/:foodId", foodController.getFoodId);

router.post("/", foodController.postOrder);

//food => PATCH
router.patch("/", foodController.patchFood);

//food => DELETE
router.delete("/", foodController.deleteFood);
module.exports = router;
