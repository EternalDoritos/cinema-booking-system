const express = require("express");

const router = express.Router();

const listingController = require("../controller/listing");

//listing -> GET
router.get("/:id", listingController.getListing);

//listing -> POST
router.post("/", listingController.postListing);

//listing -> PATCH
router.patch("/seat", listingController.patchListing);
router.patch("/", listingController.patchListingAll);

//listing -> DELETE
router.delete("/", listingController.deleteListing);
module.exports = router;
