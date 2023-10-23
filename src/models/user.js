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

async function isExistingUser(username) {
  try {
    const existingResult = await query('SELECT * FROM users WHERE username = ?', [username]);
    return existingResult.length !== 0;
  } catch (error) {
    throw error;
  }
}

async function addUser(username, email, password) {
  try {
    const result = await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    return result;
  } catch (error) {
    throw error;
  }
}

async function findUser(username, password) {
  try {
    const findUserResult = await query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
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
