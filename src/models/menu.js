const dbconfig = require('../config/db');

async function fetch() {
  const db = dbconfig.makeDb();
  try {
    const results = await db.query('SELECT name, price, availability FROM menu');
    await db.close();
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateAvailability(item, status) {
  const db = dbconfig.makeDb();
  try {
    const statusResult = await db.query('UPDATE menu SET availability = ? WHERE id = ?', [status, item]);
    await db.close();
    return statusResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  fetch,
  updateAvailability,
};
