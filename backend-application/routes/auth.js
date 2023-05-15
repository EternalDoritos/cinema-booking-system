const express = require("express");

const router = express.Router();

const authController = require("../controller/auth");

//auth -> POST
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/getUsers", authController.getUsers);
router.put("/editUser/:id", authController.editUser);
router.get("/getUserById/:id", authController.getUserById);
router.put("/suspendUserAccess/:id", authController.suspendUserAccess);
router.put("/resumeUserAccess/:id", authController.resumeUserAccess);
router.put("/grantUserAccess/:id", authController.grantUserAccess);
module.exports = router;
