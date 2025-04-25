const db = require("./db");

async function model(query, data = []) {
  const [rows] = await db.query(query, data);
  return rows;
}

module.exports = {
  model,
};
