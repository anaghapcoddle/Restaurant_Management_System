/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function fetch() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const results = await query('SELECT * FROM orders');
    con.end((err) => {
      if (err) throw err;
    });
    return results;
  } catch (error) {
    throw error;
  }
}

async function add(employeeId, diningTableId, type, status, deliveryStatus) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const addResult = await query('INSERT INTO orders (employee_id, dining_table_id, type, status, delivery_status) VALUES (?, ?, ?, ?, ?)', [employeeId, diningTableId, type, status, deliveryStatus]);
    con.end((err) => {
      if (err) throw err;
    });
    return addResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetch,
  add,
};
