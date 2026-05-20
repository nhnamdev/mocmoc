const path = require("node:path");
const config = require("../config/env");
const AppError = require("../utils/AppError");

function normalizeUrlPath(value) {
  return value.split(path.sep).join("/");
}

async function uploadProjectImage(req, res, next) {
  if (!req.file) {
    return next(new AppError("Vui lòng chọn ảnh để tải lên", 422));
  }

  const relativePath = normalizeUrlPath(path.relative(config.uploadDir, req.file.path));
  const url = `/uploads/${relativePath}`;

  res.status(201).json({
    success: true,
    data: {
      url,
      relativePath,
      fileName: req.file.filename,
      folder: req.uploadProjectSlug,
      mimeType: req.file.mimetype,
      size: req.file.size,
    },
  });
}

module.exports = {
  uploadProjectImage,
};
