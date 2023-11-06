/* eslint-disable no-useless-catch */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

let offset; let pageNumberInt; let previousInt; let nextInt;

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

async function orderHistoryInitialLoad(pageNumber, previous, next) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });

    pageNumberInt = parseInt(pageNumber, 10);
    previousInt = parseInt(previous, 10);
    nextInt = parseInt(next, 10);

    if (previousInt && pageNumberInt > 1) {
      pageNumberInt -= 1;
    }
    if (nextInt) {
      pageNumberInt += 1;
    }
    offset = (pageNumberInt - 1) * 2;
    const orderHistoryResult = await query('SELECT * FROM ORDERS LIMIT 15 OFFSET ?', [offset]);
    con.end((err) => {
      if (err) throw err;
    });
    return orderHistoryResult;
  } catch (error) {
    throw error;
  }
}

async function selectedRangeOrderHistory(startDate, endDate) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const selectedRangeOrderHistoryResult = await query('SELECT * FROM ORDERS WHERE DATE(created) BETWEEN ? AND ?', [startDate, endDate]);
    con.end((err) => {
      if (err) throw err;
    });
    return selectedRangeOrderHistoryResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  monthlySales,
  selectedRangeSales,
  orderHistoryInitialLoad,
  selectedRangeOrderHistory,
};
