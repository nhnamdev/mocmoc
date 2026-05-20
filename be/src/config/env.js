const dotenv = require("dotenv");

dotenv.config();

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function parseOrigins(value) {
  if (!value || value === "*") return "*";
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: toNumber(process.env.PORT, 4000),
  appOrigins: parseOrigins(process.env.APP_ORIGIN || "http://localhost:3000"),
  trustProxy: toBoolean(process.env.TRUST_PROXY, false),
  adminApiKey: process.env.ADMIN_API_KEY || "",
  db: {
    host: process.env.DB_HOST || "36.50.27.243",
    port: toNumber(process.env.DB_PORT, 3306),
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "default",
    connectionLimit: toNumber(process.env.DB_CONNECTION_LIMIT, 10),
  },
};

module.exports = config;
