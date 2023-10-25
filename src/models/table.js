/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function isTableOccupied(table, date, time) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const occupiedTableResult = await query('SELECT * FROM reservation WHERE dining_table_id = ? AND date = ? AND time = ?', [table, date, time]);
    con.end((err) => {
      if (err) throw err;
    });
    return occupiedTableResult.length !== 0;
  } catch (error) {
    throw error;
  }
}

async function reserveTable(name, phone, email, date, time, table, guest) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const reserveResult = await query('INSERT INTO reservation (name, phone, email, date, time, dining_table_id, guest_count) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, phone, email, date, time, table, guest]);
    con.end((err) => {
      if (err) throw err;
    });
    return reserveResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  reserveTable,
  isTableOccupied,
};
