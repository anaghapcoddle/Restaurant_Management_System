const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function createBill(orderId) {
  // eslint-disable-next-line no-useless-catch
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);
    const billResultQuery = `
    SELECT orders.created AS Date, orders.type AS Order_Type, orders.employee_id AS Staff,
      orders.id AS Bill_No,
      orders.total_amount AS Total_amount
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    WHERE orders.id = ?;
  `;

    const billItemsResultQuery = `
    SELECT order_items.menu_id AS Menu_Items, order_items.quantity
    FROM order_items 
    WHERE order_id = ?;
  `;

    const billResult = await query(billResultQuery, [orderId]);
    const billItemsResult = await query(billItemsResultQuery, [orderId]);

    const menuItems = billItemsResult.map((row) => ({
      Menu_Items: row.Menu_Items,
      quantity: row.quantity,
    })).filter((item) => item.Menu_Items && item.quantity);

    const finalResult = { ...billResult[0], Ordered_Items: menuItems };

    console.log(finalResult);

    con.end((err) => {
      if (err) throw err;
    });
    return finalResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBill,
};
