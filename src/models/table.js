const dbconfig = require('../config/db');

async function isTableOccupied(table, date, time) {
  const db = dbconfig.makeDb();
  let occupiedTableResult;
  try {
    occupiedTableResult = await db.query('SELECT * FROM reservation WHERE dining_table_id = ? AND date = ? AND time = ?', [table, date, time]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return occupiedTableResult.length !== 0;
}

async function reserveTable(name, phone, email, date, time, table, guest) {
  const db = dbconfig.makeDb();
  let reserveResult;
  try {
    reserveResult = await db.query('INSERT INTO reservation (name, phone, email, date, time, dining_table_id, guest_count) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, phone, email, date, time, table, guest]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return reserveResult;
}

async function viewReservation() {
  const db = dbconfig.makeDb();
  let reservationViewResult;
  try {
    reservationViewResult = await db.query('SELECT name,phone,email,date,time,dining_table_id,guest_count FROM reservation');
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return reservationViewResult;
}

async function cancelReservation(name, phone, date) {
  const db = dbconfig.makeDb();
  try {
    await db.query('DELETE FROM reservation WHERE name = ? AND phone = ? AND date = ?', [name, phone, date]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  reserveTable,
  isTableOccupied,
  viewReservation,
  cancelReservation,
};
