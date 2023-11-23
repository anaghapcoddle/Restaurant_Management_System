const dbconfig = require('../config/db');

async function view() {
  const db = dbconfig.makeDb();
  let result;
  try {
    result = await db.query('SELECT name, price, availability FROM menu');
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

async function updateAvailability(item, status) {
  const db = dbconfig.makeDb();
  let result;
  try {
    result = await db.query('UPDATE menu SET availability = ? WHERE id = ?', [status, item]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

module.exports = {
  view,
  updateAvailability,
};
