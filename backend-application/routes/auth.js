const express = require("express");

const router = express.Router();

const authController = require("../controller/auth");

//auth -> POST
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/createUnvalidatedUser", authController.createUnvalidatedUser);
router.get("/getUsers", authController.getUsers);
router.put("/editUser/:id", authController.editUser);
router.get("/getUserById/:id", authController.getUserById);
router.get("/getUserByUsername/:username", authController.getUserByUsername);
router.put("/userValidateAccount/:id", authController.userValidateAccount);
router.put("/suspendUserAccess/:id", authController.suspendUserAccess);
router.put("/resumeUserAccess/:id", authController.resumeUserAccess);
router.put("/grantUserAccess/:id", authController.grantUserAccess);
module.exports = router;
