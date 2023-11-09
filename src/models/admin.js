/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function addCategory(categoryName) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('INSERT INTO category (name) VALUES (?)', [categoryName]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

async function removeCategory(categoryName) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('DELETE FROM category WHERE name = ?', [categoryName]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

async function addMenuItem(firstName, lastName, phone, address, jobId, salary, email, employeeId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query('DELETE FROM category WHERE name = ?', [categoryName]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addCategory,
  removeCategory,
};
