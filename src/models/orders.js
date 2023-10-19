/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

const { promisify } = require('util');
const ordersCon = require('../config/db');

const query = promisify(ordersCon.query).bind(ordersCon);

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
