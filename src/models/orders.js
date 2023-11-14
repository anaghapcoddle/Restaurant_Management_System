const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function fetch() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const results = await query('SELECT * FROM orders');
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function add(employeeId, diningTableId, type, status, deliveryStatus, items) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
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
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function update(orderId, updateItems) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    const totalPriceResult = await query('SELECT total_amount FROM orders WHERE id = ?', [orderId]);
    let totalPrice = parseInt(totalPriceResult[0].total_amount, 10);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of updateItems) {
      const result = await query('SELECT price FROM menu WHERE id = ?', [item.name]);
      const { price } = result[0];
      const itemExistResult = await query('SELECT * FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, item.name]);
      if (itemExistResult.length !== 0) {
        const quantityResult = await query('SELECT quantity,amount FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, item.name]);
        const quantityOrdered = parseInt(quantityResult[0].quantity, 10);
        const currentItemAmount = parseInt(quantityResult[0].amount, 10);
        const totalQuantity = quantityOrdered + item.quantity;
        const priceToBeAdded = price * item.quantity;
        const newItemTotalPrice = currentItemAmount + priceToBeAdded;
        await query('UPDATE order_items SET quantity = ?, amount = ? WHERE order_id = ? AND menu_id = ?', [totalQuantity, newItemTotalPrice, orderId, item.name]);
        totalPrice += priceToBeAdded;
      } else {
        const itemTotalPrice = price * item.quantity;
        totalPrice += itemTotalPrice;
        await query('INSERT INTO order_items (order_id, menu_id, quantity, amount) VALUES (?, ?, ?, ?)', [orderId, item.name, item.quantity, itemTotalPrice]);
      }
    }
    await query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalPrice, orderId]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function isItemExisting(orderId, removeItems) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    let itemExistResult;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of removeItems) {
      itemExistResult = await query('SELECT * FROM order_items WHERE order_id = ? AND menu_id = ? AND quantity > 0', [orderId, item.name, quantityOrdered]);
    }
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return itemExistResult.length === 0;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function remove(orderId, removeItems) {
  try {
    const con = mysql.createConnection(dbconfig);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const query = promisify(con.query).bind(con);
    const totalPriceResult = await query('SELECT total_amount FROM orders WHERE id = ?', [orderId]);
    let totalPrice = parseInt(totalPriceResult[0].total_amount, 10);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of removeItems) {
      const result = await query('SELECT price FROM menu WHERE id = ?', [item.name]);
      const { price } = result[0];

      const quantityResult = await query('SELECT quantity,amount FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, item.name]);
      const quantityOrdered = parseInt(quantityResult[0].quantity, 10);
      const currentItemAmount = parseInt(quantityResult[0].amount, 10);
      const totalQuantity = quantityOrdered - item.quantity;
      const priceToBeReduced = price * item.quantity;
      const newItemTotalPrice = currentItemAmount - priceToBeReduced;
      await query('UPDATE order_items SET quantity = ?, amount = ? WHERE order_id = ? AND menu_id = ?', [totalQuantity, newItemTotalPrice, orderId, item.name]);
      totalPrice -= priceToBeReduced;
    }
    await query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalPrice, orderId]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  fetch,
  add,
  update,
  remove,
  isItemExisting,
};
