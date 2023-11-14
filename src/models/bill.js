const dbconfig = require('../config/db');

async function createBill(orderId) {
  const db = dbconfig.makeDb();
  try {
    const billResultQuery = `
    SELECT created AS Date, type AS Order_Type, employee_id AS Staff,
      id AS Bill_No,
      total_amount AS Total_amount
    FROM orders
    WHERE id = ?;
  `;

    const billItemsResultQuery = `
    SELECT menu.name AS Item, order_items.quantity
    FROM menu
    LEFT JOIN order_items ON menu.id = order_items.menu_id
    WHERE order_items.order_id = ?;    
  `;

    const billResult = await db.query(billResultQuery, [orderId]);
    const billItemsResult = await db.query(billItemsResultQuery, [orderId]);

    const menuItems = billItemsResult.map((row) => ({
      item: row.Item,
      quantity: row.quantity,
    })).filter((item) => item.Item && item.Quantity);

    const finalResult = { ...billResult[0], Ordered_Items: menuItems };

    await db.close();
    return finalResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  createBill,
};
