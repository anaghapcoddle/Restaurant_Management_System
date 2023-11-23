const dbconfig = require('../config/db');

async function view() {
  const db = dbconfig.makeDb();
  let results;
  try {
    results = await db.query('SELECT * FROM orders WHERE created > now() - interval 1 week');
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return results;
}

async function calculatePrice(obj) {
  const db = dbconfig.makeDb();
  let itemTotalPrice;
  try {
    const result = await db.query('SELECT price FROM menu WHERE id = ?', [obj.id]);
    const { price } = result[0];
    itemTotalPrice = price * obj.quantity;
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return itemTotalPrice;
}

async function addOrder(employeeId, diningTableId, totalAmount, type, status, deliveryStatus) {
  const db = dbconfig.makeDb();
  let orderId;
  try {
    const orderResult = await db.query(
      'INSERT INTO orders (employee_id, dining_table_id, total_amount, type, status, delivery_status) VALUES (?, ?, ?, ?, ?, ?)',
      [employeeId, diningTableId, totalAmount, type, status, deliveryStatus],
    );
    orderId = orderResult.insertId;
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return orderId;
}

async function addOrderItems(orderId, menuId, quantity) {
  const db = dbconfig.makeDb();
  try {
    await db.query('INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)', [orderId, menuId, quantity]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function findCurrentTotalPrice(orderId) {
  const db = dbconfig.makeDb();
  let totalPrice;
  try {
    const result = await db.query('SELECT total_amount FROM orders WHERE id = ?', [orderId]);
    totalPrice = parseFloat(result[0].total_amount);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return totalPrice;
}

async function updateTotalPrice(totalPrice, orderId) {
  const db = dbconfig.makeDb();
  try {
    await db.query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalPrice, orderId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateOrder(orderId, menuId, quantity) {
  const db = dbconfig.makeDb();
  try {
    const ifItemExistsResult = await db.query('SELECT * FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, menuId]);
    if (ifItemExistsResult.length !== 0) {
      const quantityResult = await db.query('SELECT quantity FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, menuId]);
      const quantityOrdered = parseInt(quantityResult[0].quantity, 10);
      const totalQuantity = quantityOrdered + quantity;
      await db.query('UPDATE order_items SET quantity = ? WHERE order_id = ? AND menu_id = ?', [totalQuantity, orderId, menuId]);
    } else {
      await db.query('INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)', [orderId, menuId, quantity]);
    }
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function remove(orderId, menuId, quantity) {
  const db = dbconfig.makeDb();
  try {
    const result = await db.query('SELECT quantity FROM order_items WHERE order_id = ? AND menu_id = ?', [orderId, menuId]);
    const currentQuantity = parseInt(result[0].quantity, 10);
    const newQuantity = currentQuantity - quantity;
    if (newQuantity <= 0) {
      await db.query('DELETE from order_items WHERE order_id = ? AND menu_id = ?', [orderId, menuId]);
    } else {
      await db.query('UPDATE order_items SET quantity = ? WHERE order_id = ? AND menu_id = ?', [newQuantity, orderId, menuId]);
    }
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  view,
  calculatePrice,
  addOrder,
  addOrderItems,
  findCurrentTotalPrice,
  updateTotalPrice,
  updateOrder,
  remove,
};
