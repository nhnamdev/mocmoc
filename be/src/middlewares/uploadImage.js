const fs = require("node:fs");
const path = require("node:path");
const multer = require("multer");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const ALLOWED_MIME_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

function slugify(value) {
  return String(value || "du-an")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "du-an";
}

const storage = multer.diskStorage({
  destination(req, _file, callback) {
    const projectSlug = slugify(req.body.projectTitle || req.body.title || req.body.web || "du-an");
    const directory = path.join(config.uploadDir, "projects", projectSlug);

    fs.mkdirSync(directory, { recursive: true });
    req.uploadProjectSlug = projectSlug;
    callback(null, directory);
  },
  filename(req, file, callback) {
    const extension = ALLOWED_MIME_TYPES.get(file.mimetype);
    const safeName = slugify(path.basename(file.originalname, path.extname(file.originalname)));
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    callback(null, `${safeName}-${unique}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 1,
  },
  fileFilter(_req, file, callback) {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return callback(new AppError("Chỉ hỗ trợ ảnh JPG, PNG, WEBP hoặc GIF", 422));
    }

    callback(null, true);
  },
});

function uploadProjectImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError) {
      const message = error.code === "LIMIT_FILE_SIZE"
        ? "Ảnh không được vượt quá 8MB"
        : "Không thể tải ảnh lên";
      return next(new AppError(message, 422));
    }

    next(error);
  });
}

module.exports = {
  uploadProjectImage,
  slugify,
};
