const dbconfig = require('../../config/db');

async function monthlySales() {
  const db = dbconfig.makeDb();
  try {
    const monthlySalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'netSales'
    FROM orders
    WHERE created>now() - interval 1 month;
      `;
    const monthlySalesResult = await db.query(monthlySalesQuery);
    await db.close();
    return monthlySalesResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function selectedRangeSales(startDate, endDate) {
  const db = dbconfig.makeDb();
  try {
    const selectedRangeSalesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'netSales'
    FROM orders
    WHERE DATE(created) BETWEEN ? AND ?;
      `;
    const selectedRangeSalesResult = await db.query(selectedRangeSalesQuery, [startDate, endDate]);
    await db.close();
    return selectedRangeSalesResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function orderHistoryInitialLoad(pageNumber, previous, next) {
  const db = dbconfig.makeDb();
  try {
    if (previous && pageNumber > 1) {
      pageNumber -= 1;
    }
    if (next) {
      pageNumber += 1;
    }
    const offset = (pageNumber - 1) * 2;
    const orderHistoryResult = await db.query('SELECT * FROM ORDERS WHERE created > now() - interval 1 month LIMIT 15 OFFSET ? ', [offset]);
    await db.close();
    return orderHistoryResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function selectedRangeOrderHistory(startDate, endDate) {
  const db = dbconfig.makeDb();
  try {
    const selectedRangeOrderHistoryResult = await db.query('SELECT * FROM ORDERS WHERE DATE(created) BETWEEN ? AND ?', [startDate, endDate]);
    await db.close();
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
