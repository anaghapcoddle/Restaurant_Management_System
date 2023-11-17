const dbconfig = require('../../config/db');

async function addCategory(categoryName) {
  const db = dbconfig.makeDb();
  try {
    await db.query('INSERT INTO category (name) VALUES (?)', [categoryName]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function disableCategory(status, categoryId) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE category SET availability = ? WHERE id = ?', [status, categoryId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addMenuItem(itemName, categoryId, price, availability) {
  const db = dbconfig.makeDb();
  try {
    await db.query('INSERT INTO menu (name, category_id, price, availability) VALUES (?,?,?,?)', [itemName, categoryId, price, availability]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function changeItemPrice(itemName, newPrice) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE menu SET price = ? WHERE name = ?', [newPrice, itemName]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function removeMenuItem(itemName) {
  const db = dbconfig.makeDb();
  try {
    await db.query('DELETE FROM menu WHERE name = ?', [itemName]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateMenuItemsAvailability(categoryId, availability) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE menu SET availability = ? WHERE category_id = ?', [availability, categoryId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  addCategory,
  disableCategory,
  addMenuItem,
  changeItemPrice,
  removeMenuItem,
  updateMenuItemsAvailability,
};
