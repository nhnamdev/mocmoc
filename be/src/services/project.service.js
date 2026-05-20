const { getPool } = require("../config/database");

function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    link: row.link,
    image: row.image,
    width: row.image_width,
    height: row.image_height,
    blank: Boolean(row.open_in_new_tab),
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function listProjects({ includeInactive = false } = {}) {
  const where = includeInactive ? "" : "WHERE is_active = 1";
  const [rows] = await getPool().query(
    `SELECT * FROM featured_projects ${where} ORDER BY sort_order ASC, id ASC`,
  );
  return rows.map(mapProject);
}

async function getProjectById(id) {
  const [rows] = await getPool().execute("SELECT * FROM featured_projects WHERE id = ?", [id]);
  return rows[0] ? mapProject(rows[0]) : null;
}

async function createProject(data) {
  const [result] = await getPool().execute(
    `INSERT INTO featured_projects
      (title, link, image, image_width, image_height, open_in_new_tab, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.link,
      data.image,
      data.width,
      data.height,
      data.blank ? 1 : 0,
      data.isActive ? 1 : 0,
      data.sortOrder,
    ],
  );

  return getProjectById(result.insertId);
}

async function updateProject(id, data) {
  await getPool().execute(
    `UPDATE featured_projects
     SET title = ?, link = ?, image = ?, image_width = ?, image_height = ?,
         open_in_new_tab = ?, is_active = ?, sort_order = ?
     WHERE id = ?`,
    [
      data.title,
      data.link,
      data.image,
      data.width,
      data.height,
      data.blank ? 1 : 0,
      data.isActive ? 1 : 0,
      data.sortOrder,
      id,
    ],
  );

  return getProjectById(id);
}

async function deleteProject(id) {
  const [result] = await getPool().execute("DELETE FROM featured_projects WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
