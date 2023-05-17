const express = require("express");

const router = express.Router();

const authController = require("../controller/auth");

//auth -> POST
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/createInvalidatedUser", authController.createInvalidatedUser);
router.get("/getUsers", authController.getUsers);
router.get("/getInvalidUsers", authController.getInvalidUsers);
router.put("/editUser/:id", authController.editUser);
router.get("/getUserById/:id", authController.getUserById);
router.get("/getUserByEmail/:email", authController.getUserByEmail);
router.get("/getUserByUsername/:username", authController.getUserByUsername);
router.get(
  "/getInvalidatedUserByUsername/:username",
  authController.getInvalidatedUserByUsername
);
router.put("/validateUserAccount/:id", authController.validateUserAccount);
router.put("/suspendUserAccess/:id", authController.suspendUserAccess);
router.put("/resumeUserAccess/:id", authController.resumeUserAccess);
router.put("/grantUserAccess/:id", authController.grantUserAccess);
module.exports = router;
