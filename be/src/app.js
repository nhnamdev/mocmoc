const express = require("express");
const path = require("node:path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const config = require("./config/env");
const healthRoutes = require("./routes/health.routes");
const contactRoutes = require("./routes/contact.routes");
const siteRoutes = require("./routes/site.routes");
const adminRoutes = require("./routes/admin.routes");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

const app = express();

if (config.trustProxy) {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: config.appOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);

app.use("/admin", express.static(path.join(__dirname, "admin")));
app.use("/uploads", express.static(config.uploadDir, { maxAge: "30d" }));
app.use("/api/health", healthRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
