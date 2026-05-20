const AppError = require("../utils/AppError");

const PHONE_PATTERN = /^[0-9+()\s.-]{8,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value, maxLength) {
  if (value === undefined || value === null) return "";
  return String(value).trim().slice(0, maxLength);
}

function validateContact(req, _res, next) {
  const name = cleanText(req.body.name, 120);
  const phone = cleanText(req.body.phone, 30);
  const email = cleanText(req.body.email, 180);
  const service = cleanText(req.body.service, 120);
  const message = cleanText(req.body.message, 2000);
  const source = cleanText(req.body.source, 120);
  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  }

  if (!phone) {
    errors.phone = "Phone is required";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Phone format is invalid";
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Email format is invalid";
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed", 422, errors));
  }

  req.validatedBody = {
    name,
    phone,
    email: email || null,
    service: service || null,
    message: message || null,
    source: source || "website",
  };

  next();
}

module.exports = validateContact;
