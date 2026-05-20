const fs = require("node:fs/promises");
const path = require("node:path");
const mysql = require("mysql2/promise");
const config = require("../config/env");

function quoteIdentifier(identifier) {
  return `\`${String(identifier).replace(/`/g, "``")}\``;
}

async function ensureDatabase() {
  if (!config.db.user) {
    throw new Error("DB_USER is required");
  }

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${quoteIdentifier(config.db.database)}
     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  await connection.end();
}

async function runMigration() {
  await ensureDatabase();

  const schemaPath = path.join(__dirname, "..", "..", "database", "schema.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
  });

  await connection.query(schema);
  await connection.end();

  console.log(`Database migration completed for ${config.db.database}`);
}

runMigration().catch((error) => {
  console.error("Database migration failed:", error.message);
  process.exit(1);
});
