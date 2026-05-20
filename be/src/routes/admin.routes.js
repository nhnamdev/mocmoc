const express = require("express");
const adminController = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/adminAuth");
const asyncHandler = require("../utils/asyncHandler");
const { validateProject, validatePricingPlan } = require("../validators/admin.validator");

const router = express.Router();

router.use(adminAuth);

router.get("/projects", asyncHandler(adminController.listProjects));
router.post("/projects", validateProject, asyncHandler(adminController.createProject));
router.put("/projects/:id", validateProject, asyncHandler(adminController.updateProject));
router.delete("/projects/:id", asyncHandler(adminController.deleteProject));

router.get("/pricing-plans", asyncHandler(adminController.listPricingPlans));
router.post("/pricing-plans", validatePricingPlan, asyncHandler(adminController.createPricingPlan));
router.put("/pricing-plans/:id", validatePricingPlan, asyncHandler(adminController.updatePricingPlan));
router.delete("/pricing-plans/:id", asyncHandler(adminController.deletePricingPlan));

module.exports = router;
