const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function isTableOccupied(table, date, time) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    const occupiedTableResult = await query('SELECT * FROM reservation WHERE dining_table_id = ? AND date = ? AND time = ?', [table, date, time]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return occupiedTableResult.length !== 0;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function reserveTable(name, phone, email, date, time, table, guest) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    const reserveResult = await query('INSERT INTO reservation (name, phone, email, date, time, dining_table_id, guest_count) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, phone, email, date, time, table, guest]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return reserveResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function viewReservation() {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    const reservationViewResult = await query('SELECT name,phone,email,date,time,dining_table_id,guest_count FROM reservation');
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return reservationViewResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function cancelReservation(name, phone, date) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    await query('DELETE FROM reservation WHERE name = ? AND phone = ? AND date = ?', [name, phone, date]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
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
