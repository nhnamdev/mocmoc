const express = require("express");
const contactController = require("../controllers/contact.controller");
const asyncHandler = require("../utils/asyncHandler");
const validateContact = require("../validators/contact.validator");

const router = express.Router();

router.post("/", validateContact, asyncHandler(contactController.createContact));

module.exports = router;
