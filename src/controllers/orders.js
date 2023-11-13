const ordersModel = require('../models/orders');

async function fetch(req, res) {
  try {
    const results = await ordersModel.fetch();
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    console.error('Error:', error);
  }
}

async function add(req, res) {
  try {
    const employeeId = req.body.employee_id;
    const diningTableId = req.body.dining_table_id;
    const { type } = req.body;
    const { status } = req.body;
    const deliveryStatus = req.body.delivery_status;
    const items = [];

    for (let i = 0; req.body[`item${i}_name`]; i += 1) {
      const item = {
        name: req.body[`item${i}_name`],
        quantity: parseFloat(req.body[`item${i}_quantity`]),
      };
      items.push(item);
    }
    await ordersModel.add(employeeId, diningTableId, type, status, deliveryStatus, items);
    res.status(201).json({
      success: true,
      message: 'Data inserted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    console.error('Error:', error);
  }
}

async function update(req, res) {
  try {
    const orderNumber = req.body.order_number;
    const updateItems = [];
    for (let i = 0; req.body[`item${i}_name`]; i += 1) {
      const item = {
        name: req.body[`item${i}_name`],
        quantity: parseFloat(req.body[`item${i}_quantity`]),
      };
      updateItems.push(item);
    }
    await ordersModel.update(orderNumber, updateItems);
    res.status(200).json({
      success: true,
      message: 'Data updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    console.error('Error:', error);
  }
}

async function remove(req, res) {
  try {
    const orderNumber = req.body.order_number;
    const removeItems = [];
    for (let i = 0; req.body[`item${i}_name`]; i += 1) {
      const item = {
        name: req.body[`item${i}_name`],
        quantity: parseFloat(req.body[`item${i}_quantity`]),
      };
      removeItems.push(item);
    }
    const isItemExisting = await ordersModel.isItemExisting(orderNumber, removeItems);
    if (isItemExisting) {
      res.status(400).json({
        success: false,
        message: 'Contains items which are not ordered or more number than ordered',
      });
    }
    await ordersModel.remove(orderNumber, removeItems);
    res.status(200).json({
      success: false,
      message: 'Data removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    console.error('Error:', error);
  }
}

module.exports = {
  fetch,
  add,
  update,
  remove,
};
