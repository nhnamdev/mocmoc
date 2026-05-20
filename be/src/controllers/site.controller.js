const siteService = require("../services/site.service");

async function getHomeData(_req, res) {
  const data = await siteService.getHomeData();

  res.json({
    success: true,
    data,
  });
}

module.exports = {
  getHomeData,
};
