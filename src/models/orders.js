const dbconfig = require('../config/db');

async function fetch() {
  const db = dbconfig.makeDb();
  try {
    const results = await db.query('SELECT * FROM orders');
    await db.close();
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function add(employeeId, diningTableId, type, status, deliveryStatus, items) {
  const db = dbconfig.makeDb();
  try {
    const orderResult = await db.query(
      'INSERT INTO orders (employee_id, dining_table_id, type, status, delivery_status) VALUES (?, ?, ?, ?, ?)',
      [employeeId, diningTableId, type, status, deliveryStatus],
    );
    const orderId = orderResult.insertId;
    let totalOrderPrice = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      const result = await db.query('SELECT price FROM menu WHERE id = ?', [item.name]);
      const { price } = result[0];
      const itemTotalPrice = price * item.quantity;
      totalOrderPrice += itemTotalPrice;
      await db.query('INSERT INTO order_items (order_id, menu_id, quantity, amount) VALUES (?, ?, ?, ?)', [orderId, item.name, item.quantity, itemTotalPrice]);
    }
    await db.query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalOrderPrice, orderId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function update(orderId, updateItems) {
  const db = dbconfig.makeDb();
  try {
    const totalPriceResult = await db.query('SELECT total_amount FROM orders WHERE id = ?', [orderId]);
    let totalPrice = parseInt(totalPriceResult[0].total_amount, 10);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of updateItems) {
      const result = await db.query('SELECT price FROM menu WHERE id = ?', [item.name]);
      const { price } = result[0];
      const itemExistResult = await db.query('SELECT * FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, item.name]);
      if (itemExistResult.length !== 0) {
        const quantityResult = await db.query('SELECT quantity,amount FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, item.name]);
        const quantityOrdered = parseInt(quantityResult[0].quantity, 10);
        const currentItemAmount = parseInt(quantityResult[0].amount, 10);
        const totalQuantity = quantityOrdered + item.quantity;
        const priceToBeAdded = price * item.quantity;
        const newItemTotalPrice = currentItemAmount + priceToBeAdded;
        await db.query('UPDATE order_items SET quantity = ?, amount = ? WHERE order_id = ? AND menu_id = ?', [totalQuantity, newItemTotalPrice, orderId, item.name]);
        totalPrice += priceToBeAdded;
      } else {
        const itemTotalPrice = price * item.quantity;
        totalPrice += itemTotalPrice;
        await db.query('INSERT INTO order_items (order_id, menu_id, quantity, amount) VALUES (?, ?, ?, ?)', [orderId, item.name, item.quantity, itemTotalPrice]);
      }
    }
    await db.query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalPrice, orderId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function isItemExisting(orderId, removeItems) {
  const db = dbconfig.makeDb();
  try {
    let itemExistResult;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of removeItems) {
      itemExistResult = await db.query('SELECT * FROM order_items WHERE order_id = ? AND menu_id = ? AND quantity > 0', [orderId, item.name, quantityOrdered]);
    }
    await db.close();
    return itemExistResult.length === 0;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function remove(orderId, removeItems) {
  const db = dbconfig.makeDb();
  try {
    const totalPriceResult = await db.query('SELECT total_amount FROM orders WHERE id = ?', [orderId]);
    let totalPrice = parseInt(totalPriceResult[0].total_amount, 10);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of removeItems) {
      const result = await db.query('SELECT price FROM menu WHERE id = ?', [item.name]);
      const { price } = result[0];
      const quantityResult = await db.query('SELECT quantity,amount FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, item.name]);
      const quantityOrdered = parseInt(quantityResult[0].quantity, 10);
      const currentItemAmount = parseInt(quantityResult[0].amount, 10);
      const totalQuantity = quantityOrdered - item.quantity;
      const priceToBeReduced = price * item.quantity;
      const newItemTotalPrice = currentItemAmount - priceToBeReduced;
      await db.query('UPDATE order_items SET quantity = ?, amount = ? WHERE order_id = ? AND menu_id = ?', [totalQuantity, newItemTotalPrice, orderId, item.name]);
      totalPrice -= priceToBeReduced;
    }
    await db.query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalPrice, orderId]);
    await db.close();
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
