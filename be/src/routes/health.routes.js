const express = require("express");
const { pingDatabase } = require("../config/database");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "mocmoc-api",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

router.get(
  "/db",
  asyncHandler(async (_req, res) => {
    await pingDatabase();
    res.json({
      success: true,
      database: "ok",
      timestamp: new Date().toISOString(),
    });
  }),
);

module.exports = router;
