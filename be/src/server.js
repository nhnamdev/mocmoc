const app = require("./app");
const config = require("./config/env");
const { closePool } = require("./config/database");

const server = app.listen(config.port, () => {
  console.log(`MOCMOC API is running on port ${config.port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down API...`);
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
