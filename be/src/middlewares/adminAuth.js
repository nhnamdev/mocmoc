const config = require("../config/env");
const AppError = require("../utils/AppError");

function adminAuth(req, _res, next) {
  if (!config.adminApiKey) {
    return next(new AppError("ADMIN_API_KEY is not configured", 503));
  }

  const bearer = req.get("authorization") || "";
  const token = bearer.startsWith("Bearer ") ? bearer.slice(7).trim() : "";
  const adminKey = req.get("x-admin-key") || token;

  if (adminKey !== config.adminApiKey) {
    return next(new AppError("Unauthorized", 401));
  }

  next();
}

module.exports = adminAuth;
