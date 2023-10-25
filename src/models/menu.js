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
    const results = await query('SELECT name, price, availability FROM menu');
    con.end();
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetch,
};
