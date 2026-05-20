const { getPool } = require("../config/database");

async function createContact(data) {
  const [result] = await getPool().execute(
    `INSERT INTO contacts
      (name, phone, email, service, message, source, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.phone,
      data.email,
      data.service,
      data.message,
      data.source,
      data.ipAddress,
      data.userAgent,
    ],
  );

  return {
    id: result.insertId,
    name: data.name,
    phone: data.phone,
    email: data.email,
    service: data.service,
    source: data.source,
  };
}

module.exports = {
  createContact,
};
