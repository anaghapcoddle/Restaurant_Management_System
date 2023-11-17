const dbconfig = require('../../config/db');

async function sales(startDate, endDate) {
  const db = dbconfig.makeDb();
  let salesResult;
  try {
    const salesQuery = `
    SELECT COUNT(id) AS 'Total number of orders', SUM(total_amount) AS 'netSales'
    FROM orders
    WHERE 
        CASE
            WHEN ? IS NOT NULL AND ? IS NOT NULL THEN DATE(created) BETWEEN ? AND ?
            ELSE created > now() - INTERVAL 1 MONTH
        END;
    `;
    salesResult = await db.query(salesQuery, [startDate, endDate, startDate, endDate]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return salesResult;
}

async function orderHistory(pageNumber, previous, next, startDate, endDate) {
  const db = dbconfig.makeDb();
  let result;
  let newPageNumber = pageNumber;
  try {
    if (previous && newPageNumber > 1) {
      newPageNumber -= 1;
    }
    if (next) {
      newPageNumber += 1;
    }
    const offset = (newPageNumber - 1) * 15;

    const orderHistoryQuery = `
    SELECT * 
    FROM ORDERS 
    WHERE
      CASE
        WHEN ? IS NOT NULL AND ? IS NOT NULL THEN DATE(created) BETWEEN ? AND ?
          ELSE created > now() - interval 1 month 
      END
      LIMIT 15 OFFSET ?;   
    `;
    result = await db.query(orderHistoryQuery, [startDate, endDate, startDate, endDate, offset]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

module.exports = {
  sales,
  orderHistory,
};
