const projectService = require("./project.service");
const pricingService = require("./pricing.service");

async function getHomeData() {
  const [projects, pricingPlans] = await Promise.all([
    projectService.listProjects(),
    pricingService.listPricingPlans(),
  ]);

  return {
    projects,
    pricingPlans,
  };
}

module.exports = {
  getHomeData,
};
