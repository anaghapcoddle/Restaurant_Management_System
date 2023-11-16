const dbconfig = require('../config/db');

async function view() {
  const db = dbconfig.makeDb();
  let results;
  try {
    results = await db.query('SELECT name, price, availability FROM menu');
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return results;
}

async function updateAvailability(item, status) {
  const db = dbconfig.makeDb();
  let statusResult;
  try {
    statusResult = await db.query('UPDATE menu SET availability = ? WHERE id = ?', [status, item]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return statusResult;
}

module.exports = {
  view,
  updateAvailability,
};
