/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

const con = mysql.createConnection(dbconfig);

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

const query = promisify(con.query).bind(con);

async function fetch() {
  try {
    const results = await query('SELECT * FROM orders');
    return results;
  } catch (error) {
    throw error;
  }
}

async function add(employee_id, dining_table_id, type, status, delivery_status) {
  try {
    const addResult = await query('INSERT INTO orders (employee_id, dining_table_id, type, status, delivery_status) VALUES (?, ?, ?, ?, ?)', [employee_id, dining_table_id, type, status, delivery_status]);
    return addResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetch,
  add,
};
