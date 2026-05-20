const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const config = require("./config/env");
const healthRoutes = require("./routes/health.routes");
const contactRoutes = require("./routes/contact.routes");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

const app = express();

if (config.trustProxy) {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
  cors({
    origin: config.appOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

app.use("/api/health", healthRoutes);
app.use("/api/contacts", contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
