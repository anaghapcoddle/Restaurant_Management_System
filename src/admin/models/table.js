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

async function isTableReserved(tableId) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const reservedTableResult = await query('SELECT * FROM reservation WHERE dining_table_id = ? AND CONCAT(date," ",time) >= CURRENT_TIMESTAMP()', [tableId]);
    con.end((err) => {
      if (err) throw err;
    });
    return reservedTableResult.length !== 0;
  } catch (error) {
    throw error;
  }
}

async function disableTable(status, tableId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('UPDATE dining_table SET is_disabled = ? WHERE id = ?', [status, tableId]);
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
  isTableReserved,
  disableTable,
};
