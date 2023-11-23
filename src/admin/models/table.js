const dbconfig = require('../../config/db');

async function addTableType(tableType) {
  const db = dbconfig.makeDb();
  try {
    await db.query('INSERT INTO table_type (name) VALUES (?)', [tableType]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function disableTableType(tableType, isEnabled) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE table_type SET is_enabled = ? WHERE name = ?', [isEnabled, tableType]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addTable(capacity, tableTypeId, availability) {
  const db = dbconfig.makeDb();
  try {
    await db.query('INSERT INTO dining_table (capacity, table_type_id, availability) VALUES (?,?,?)', [capacity, tableTypeId, availability]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function isTableReserved(tableId) {
  const db = dbconfig.makeDb();
  let reservedTableResult;
  try {
    reservedTableResult = await db.query('SELECT * FROM reservation WHERE dining_table_id = ? AND CONCAT(date," ",time) >= CURRENT_TIMESTAMP()', [tableId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return reservedTableResult.length !== 0;
}

async function disableTable(isEnabled, tableId) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE dining_table SET is_disabled = ? WHERE id = ?', [isEnabled, tableId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  addTableType,
  disableTableType,
  addTable,
  isTableReserved,
  disableTable,
};
