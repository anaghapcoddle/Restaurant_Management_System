/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const con = require('../config/db');

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
