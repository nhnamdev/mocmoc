const express = require("express");
const siteController = require("../controllers/site.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/home", asyncHandler(siteController.getHomeData));

module.exports = router;
