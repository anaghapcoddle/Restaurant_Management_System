/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

async function addTableType(tableType) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('INSERT INTO table_type (name) VALUES (?)', [tableType]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

async function disableTableType(status, tableType) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('UPDATE table_type SET is_disabled = ? WHERE name = ?', [status, tableType]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

async function addTable(capacity, tableTypeId, availability) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('INSERT INTO dining_table (capacity, table_type_id, availability) VALUES (?,?,?)', [capacity, tableTypeId, availability]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

async function removeTable(tableId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('DELETE FROM dining_table WHERE id = ?', [tableId]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTableType,
  disableTableType,
  addTable,
  removeTable,
};
