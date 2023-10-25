/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function isExistingUser(username) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const existingResult = await query('SELECT * FROM users WHERE username = ?', [username]);
    con.end((err) => {
      if (err) throw err;
    });
    return existingResult.length !== 0;
  } catch (error) {
    throw error;
  }
}

async function addUser(username, email, password) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const result = await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    con.end((err) => {
      if (err) throw err;
    });
    return result;
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
    const findUserResult = await query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    con.end((err) => {
      if (err) throw err;
    });
    return findUserResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  isExistingUser,
  addUser,
  findUser,
};
