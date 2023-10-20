/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const con = require('../config/db');

const query = promisify(con.query).bind(con);

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
  addUser,
  findUser,
};
