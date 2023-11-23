const dbconfig = require('../config/db');

async function createBill(orderId) {
  const db = dbconfig.makeDb();
  let finalResult;
  try {
    const billResultQuery = `
    SELECT created AS date, type AS orderType, employee_id AS staff,
      id AS billNo,
      total_amount AS totalAmount
    FROM orders
    WHERE id = ?;
  `;
    const billItemsResultQuery = `
    SELECT menu.name AS itemName, order_items.quantity AS quantity, menu.price AS rate, (order_items.quantity * menu.price) AS amount
    FROM menu
    LEFT JOIN order_items ON menu.id = order_items.menu_id
    WHERE order_items.order_id = ?;    
  `;
    const billResult = await db.query(billResultQuery, [orderId]);
    const billItemsResult = await db.query(billItemsResultQuery, [orderId]);
    finalResult = { ...billResult[0], orderedItems: billItemsResult };
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return finalResult;
}
module.exports = {
  createBill,
};
