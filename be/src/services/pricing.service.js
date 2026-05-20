const { getPool } = require("../config/database");

function mapPlan(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    oldPrice: row.old_price,
    currentPrice: row.current_price,
    currency: row.currency,
    badge: row.badge,
    buttonLabel: row.button_label,
    buttonVariant: row.button_variant,
    isFeatured: Boolean(row.is_featured),
    isActive: Boolean(row.is_active),
    sortOrder: row.sort_order,
    features: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function listPricingPlans({ includeInactive = false } = {}) {
  const where = includeInactive ? "" : "WHERE is_active = 1";
  const [plans] = await getPool().query(
    `SELECT * FROM pricing_plans ${where} ORDER BY sort_order ASC, id ASC`,
  );

  if (plans.length === 0) return [];

  const ids = plans.map((plan) => plan.id);
  const placeholders = ids.map(() => "?").join(",");
  const [features] = await getPool().query(
    `SELECT * FROM pricing_plan_features
     WHERE plan_id IN (${placeholders})
     ORDER BY plan_id ASC, sort_order ASC, id ASC`,
    ids,
  );

  const mapped = plans.map(mapPlan);
  const byId = new Map(mapped.map((plan) => [plan.id, plan]));

  for (const feature of features) {
    byId.get(feature.plan_id)?.features.push(feature.feature);
  }

  return mapped;
}

async function getPricingPlanById(id) {
  const [plans] = await getPool().execute("SELECT * FROM pricing_plans WHERE id = ?", [id]);
  if (!plans[0]) return null;

  const plan = mapPlan(plans[0]);
  const [features] = await getPool().execute(
    "SELECT feature FROM pricing_plan_features WHERE plan_id = ? ORDER BY sort_order ASC, id ASC",
    [id],
  );
  plan.features = features.map((row) => row.feature);

  return plan;
}

async function replaceFeatures(connection, planId, features) {
  await connection.execute("DELETE FROM pricing_plan_features WHERE plan_id = ?", [planId]);

  for (const [index, feature] of features.entries()) {
    await connection.execute(
      "INSERT INTO pricing_plan_features (plan_id, feature, sort_order) VALUES (?, ?, ?)",
      [planId, feature, index + 1],
    );
  }
}

async function createPricingPlan(data) {
  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.execute(
      `INSERT INTO pricing_plans
        (name, description, old_price, current_price, currency, badge, button_label,
         button_variant, is_featured, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.description,
        data.oldPrice,
        data.currentPrice,
        data.currency,
        data.badge,
        data.buttonLabel,
        data.buttonVariant,
        data.isFeatured ? 1 : 0,
        data.isActive ? 1 : 0,
        data.sortOrder,
      ],
    );
    await replaceFeatures(connection, result.insertId, data.features);
    await connection.commit();
    return getPricingPlanById(result.insertId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function updatePricingPlan(id, data) {
  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(
      `UPDATE pricing_plans
       SET name = ?, description = ?, old_price = ?, current_price = ?, currency = ?,
           badge = ?, button_label = ?, button_variant = ?, is_featured = ?,
           is_active = ?, sort_order = ?
       WHERE id = ?`,
      [
        data.name,
        data.description,
        data.oldPrice,
        data.currentPrice,
        data.currency,
        data.badge,
        data.buttonLabel,
        data.buttonVariant,
        data.isFeatured ? 1 : 0,
        data.isActive ? 1 : 0,
        data.sortOrder,
        id,
      ],
    );
    await replaceFeatures(connection, id, data.features);
    await connection.commit();
    return getPricingPlanById(id);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function deletePricingPlan(id) {
  const [result] = await getPool().execute("DELETE FROM pricing_plans WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  listPricingPlans,
  getPricingPlanById,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
};
