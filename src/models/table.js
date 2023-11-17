const dbconfig = require('../config/db');

async function isTableOccupied(table, date) {
  const db = dbconfig.makeDb();
  let occupiedTableResult;
  try {
    occupiedTableResult = await db.query('SELECT * FROM reservation WHERE dining_table_id = ? AND date = ? AND status = "0"', [table, date]);
    // console.log(occupiedTableResult);
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

async function cancelReservation(name, phone, date, table) {
  const db = dbconfig.makeDb();
  try {
    await db.query('DELETE FROM reservation WHERE name = ? AND phone = ? AND date = ? AND dining_table_id = ?', [name, phone, date, table]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateReservationStatus(status, name, phone, date, table) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE reservation SET status = ? WHERE name = ? AND phone = ? AND date = ? AND dining_table_id = ?', [status, name, phone, date, table]);
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
  updateReservationStatus,
};
