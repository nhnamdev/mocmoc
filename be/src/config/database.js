const mysql = require("mysql2/promise");
const config = require("./env");

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      waitForConnections: true,
      connectionLimit: config.db.connectionLimit,
      queueLimit: 0,
      charset: "utf8mb4",
      dateStrings: true,
    });
  }

  return pool;
}

async function pingDatabase() {
  const [rows] = await getPool().query("SELECT 1 AS ok");
  return rows[0];
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

module.exports = {
  getPool,
  pingDatabase,
  closePool,
};
