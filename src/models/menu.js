/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function fetch() {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const results = await query('SELECT name, price, availability FROM menu');
    con.end((err) => {
      if (err) throw err;
    });
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetch,
};
