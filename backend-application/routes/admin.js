const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

//admin -> POST
router.post("/reportMovie", adminController.summaryReportMovie);
router.post("/reportDate", adminController.summaryReportDate);

module.exports = router;
