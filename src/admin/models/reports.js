/* eslint-disable no-useless-catch */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

async function dailySales() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const dailySalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'Net Sales'
    FROM orders
    WHERE DATE(created) = CURDATE();
      `;
    const dailySalesResult = await query(dailySalesQuery);
    console.log(dailySalesQuery);
    con.end((err) => {
      if (err) throw err;
    });
    return dailySalesResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  dailySales,
};
