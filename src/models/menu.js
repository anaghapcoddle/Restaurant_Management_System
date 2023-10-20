/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

const con = mysql.createConnection(dbconfig);

const query = promisify(con.query).bind(con);

async function fetchMenuData() {
  try {
    const results = await query('SELECT name, price, availability FROM menu');
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchMenuData,
};
