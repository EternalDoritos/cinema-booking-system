const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

//admin -> POST
router.post("/report", adminController.summaryReport);

module.exports = router;
