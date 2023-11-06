/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function fetch() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const results = await query('SELECT * FROM orders');
    con.end((err) => {
      if (err) throw err;
    });
    return results;
  } catch (error) {
    throw error;
  }
}

async function add(employeeId, diningTableId, type, status, deliveryStatus, items) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);

    const orderResult = await query(
      'INSERT INTO orders (employee_id, dining_table_id, type, status, delivery_status) VALUES (?, ?, ?, ?, ?)',
      [employeeId, diningTableId, type, status, deliveryStatus],
    );
    const orderId = orderResult.insertId;
    let totalOrderPrice = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      const result = await query('SELECT price FROM menu WHERE id = ?', [item.name]);
      const { price } = result[0];
      const itemTotalPrice = price * item.quantity;
      totalOrderPrice += itemTotalPrice;
      await query('INSERT INTO order_items (order_id, menu_id, quantity, amount) VALUES (?, ?, ?, ?)', [orderId, item.name, item.quantity, itemTotalPrice]);
    }
    await query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalOrderPrice, orderId]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

async function update(orderNumber) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) throw err;
    });
    const query = promisify(con.query).bind(con);

    await query('INSERT INTO order_items (order_id, menu_id, quantity, amount) VALUES (?, ?, ?, ?)', [orderId, item.name, item.quantity, itemTotalPrice]);
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetch,
  add,
  update,
};
