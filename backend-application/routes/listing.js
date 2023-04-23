const express = require("express");

const router = express.Router();

const listingController = require("../controller/listing");

//listing -> GET
router.get("/:id", listingController.getListing);

//listing -> POST
router.post("/", listingController.postListing);
module.exports = router;
