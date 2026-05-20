const AppError = require("../utils/AppError");
const projectService = require("../services/project.service");
const pricingService = require("../services/pricing.service");

function parseId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    throw new AppError("Invalid id", 400);
  }
  return id;
}

async function listProjects(_req, res) {
  const projects = await projectService.listProjects({ includeInactive: true });
  res.json({ success: true, data: projects });
}

async function createProject(req, res) {
  const project = await projectService.createProject(req.validatedBody);
  res.status(201).json({ success: true, data: project });
}

async function updateProject(req, res) {
  const id = parseId(req);
  const project = await projectService.updateProject(id, req.validatedBody);
  if (!project) throw new AppError("Project not found", 404);
  res.json({ success: true, data: project });
}

async function deleteProject(req, res) {
  const id = parseId(req);
  const deleted = await projectService.deleteProject(id);
  if (!deleted) throw new AppError("Project not found", 404);
  res.json({ success: true });
}

async function listPricingPlans(_req, res) {
  const pricingPlans = await pricingService.listPricingPlans({ includeInactive: true });
  res.json({ success: true, data: pricingPlans });
}

async function createPricingPlan(req, res) {
  const pricingPlan = await pricingService.createPricingPlan(req.validatedBody);
  res.status(201).json({ success: true, data: pricingPlan });
}

async function updatePricingPlan(req, res) {
  const id = parseId(req);
  const pricingPlan = await pricingService.updatePricingPlan(id, req.validatedBody);
  if (!pricingPlan) throw new AppError("Pricing plan not found", 404);
  res.json({ success: true, data: pricingPlan });
}

async function deletePricingPlan(req, res) {
  const id = parseId(req);
  const deleted = await pricingService.deletePricingPlan(id);
  if (!deleted) throw new AppError("Pricing plan not found", 404);
  res.json({ success: true });
}

module.exports = {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
  listPricingPlans,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
};
