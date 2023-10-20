/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

const { promisify } = require('util');
const con = require('../config/db');

const query = promisify(con.query).bind(con);

async function fetchOrdersData() {
  try {
    const results = await query('SELECT * FROM orders');
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchOrdersData,
};
