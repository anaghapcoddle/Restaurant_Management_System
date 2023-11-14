const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

async function monthlySales() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const monthlySalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'Net Sales'
    FROM orders
    WHERE created>now() - interval 1 month;
      `;
    const monthlySalesResult = await query(monthlySalesQuery);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return monthlySalesResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function selectedRangeSales(startDate, endDate) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const selectedRangeSalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'Net Sales'
    FROM orders
    WHERE DATE(created) BETWEEN ? AND ?;
      `;
    const selectedRangeSalesResult = await query(selectedRangeSalesQuery, [startDate, endDate]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return selectedRangeSalesResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function orderHistoryInitialLoad(pageNumber, previous, next) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });

    if (previous && pageNumber > 1) {
      pageNumber -= 1;
    }
    if (next) {
      pageNumber += 1;
    }
    const offset = (pageNumber - 1) * 2;
    const orderHistoryResult = await query('SELECT * FROM ORDERS WHERE created > now() - interval 1 month LIMIT 15 OFFSET ? ', [offset]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return orderHistoryResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function selectedRangeOrderHistory(startDate, endDate) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const selectedRangeOrderHistoryResult = await query('SELECT * FROM ORDERS WHERE DATE(created) BETWEEN ? AND ?', [startDate, endDate]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return selectedRangeOrderHistoryResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  monthlySales,
  selectedRangeSales,
  orderHistoryInitialLoad,
  selectedRangeOrderHistory,
};
