const AppError = require("../utils/AppError");

function cleanText(value, maxLength) {
  if (value === undefined || value === null) return "";
  return String(value).trim().slice(0, maxLength);
}

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.round(parsed);
}

function toSortOrder(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : fallback;
}

function toBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function validateProject(req, _res, next) {
  const payload = {
    title: cleanText(req.body.title, 180),
    link: cleanText(req.body.link, 500) || "#",
    image: cleanText(req.body.image, 500),
    width: toPositiveInt(req.body.width, 1200),
    height: toPositiveInt(req.body.height, 800),
    blank: toBoolean(req.body.blank, true),
    isActive: toBoolean(req.body.isActive, true),
    sortOrder: toSortOrder(req.body.sortOrder, 0),
  };

  const errors = {};
  if (!payload.title) errors.title = "Title is required";
  if (!payload.image) errors.image = "Image is required";

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed", 422, errors));
  }

  req.validatedBody = payload;
  next();
}

function normalizeFeatures(value) {
  if (Array.isArray(value)) {
    return value.map((item) => cleanText(item, 300)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => cleanText(item, 300))
      .filter(Boolean);
  }

  return [];
}

function validatePricingPlan(req, _res, next) {
  const payload = {
    name: cleanText(req.body.name, 80),
    description: cleanText(req.body.description, 500),
    oldPrice: cleanText(req.body.oldPrice, 60) || null,
    currentPrice: cleanText(req.body.currentPrice, 60),
    currency: cleanText(req.body.currency, 20) || "VNĐ",
    badge: cleanText(req.body.badge, 80) || null,
    buttonLabel: cleanText(req.body.buttonLabel, 120),
    buttonVariant: cleanText(req.body.buttonVariant, 20) === "primary" ? "primary" : "outline",
    isFeatured: toBoolean(req.body.isFeatured, false),
    isActive: toBoolean(req.body.isActive, true),
    sortOrder: toSortOrder(req.body.sortOrder, 0),
    features: normalizeFeatures(req.body.features),
  };

  const errors = {};
  if (!payload.name) errors.name = "Name is required";
  if (!payload.description) errors.description = "Description is required";
  if (!payload.currentPrice) errors.currentPrice = "Current price is required";
  if (payload.features.length === 0) errors.features = "At least one feature is required";

  if (!payload.buttonLabel) {
    payload.buttonLabel = `Chọn Gói ${payload.name}`;
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed", 422, errors));
  }

  req.validatedBody = payload;
  next();
}

module.exports = {
  validateProject,
  validatePricingPlan,
};
