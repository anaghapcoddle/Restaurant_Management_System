/* eslint-disable no-useless-catch */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function addUser(username, email, password) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const result = await query('INSERT INTO employee (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    const empId = result.insertId;
    con.end((err) => {
      if (err) throw err;
    });
    return empId;
  } catch (error) {
    throw error;
  }
}

async function findUser(username, password) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const findUserResult = await query('SELECT * FROM employee WHERE username = ? AND password = ?', [username, password]);
    con.end((err) => {
      if (err) throw err;
    });
    return findUserResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addUser,
  findUser,
};
