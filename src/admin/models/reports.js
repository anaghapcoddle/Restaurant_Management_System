/* eslint-disable no-useless-catch */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

async function monthlySales() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const monthlySalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'Net Sales'
    FROM orders
    WHERE created>now() - interval 1 month;
      `;
    const monthlySalesResult = await query(monthlySalesQuery);
    con.end((err) => {
      if (err) throw err;
    });
    return monthlySalesResult;
  } catch (error) {
    throw error;
  }
}

async function selectedRangeSales(startDate, endDate) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const selectedRangeSalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'Net Sales'
    FROM orders
    WHERE DATE(created) BETWEEN ? AND ?;
      `;
    const selectedRangeSalesResult = await query(selectedRangeSalesQuery, [startDate, endDate]);
    con.end((err) => {
      if (err) throw err;
    });
    return selectedRangeSalesResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  monthlySales,
  selectedRangeSales,
};
