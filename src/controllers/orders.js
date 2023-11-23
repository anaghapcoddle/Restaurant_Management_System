const ordersModel = require('../models/orders');

async function view(req, res) {
  try {
    const results = await ordersModel.view();
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function add(req, res) {
  try {
    const { employeeId } = req.body;
    const { diningTableId } = req.body;
    const { type } = req.body;
    const { status } = req.body;
    const { deliveryStatus } = req.body;
    const { items } = req.body;
    let totalOrderPrice = 0;
    for (let i = 0; i < items.length; i += 1) {
      const obj = items[i];
      const itemTotalPrice = await ordersModel.calculatePrice(obj);
      totalOrderPrice += itemTotalPrice;
    }
    const orderId = await ordersModel.addOrder(
      employeeId,
      diningTableId,
      totalOrderPrice,
      type,
      status,
      deliveryStatus,
    );
    items.forEach(async (obj) => {
      await ordersModel.addOrderItems(orderId, obj.id, obj.quantity);
    });
    res.status(201).json({
      success: true,
      message: 'Data inserted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function update(req, res) {
  try {
    const { orderNumber } = req.body;
    const updateItems = req.body.items;
    let totalOrderPrice = await ordersModel.findCurrentTotalPrice(orderNumber);
    for (let i = 0; i < updateItems.length; i += 1) {
      const obj = updateItems[i];
      const itemTotalPrice = await ordersModel.calculatePrice(obj);
      totalOrderPrice += itemTotalPrice;
    }
    await ordersModel.updateTotalPrice(totalOrderPrice, orderNumber);
    updateItems.forEach(async (obj) => {
      await ordersModel.updateOrder(orderNumber, obj.id, obj.quantity);
    });
    res.status(200).json({
      success: true,
      message: 'Data updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function remove(req, res) {
  try {
    const { orderNumber } = req.body;
    const removeItems = req.body.items;
    let totalOrderPrice = await ordersModel.findCurrentTotalPrice(orderNumber);
    for (let i = 0; i < removeItems.length; i += 1) {
      const obj = removeItems[i];
      const itemTotalPrice = await ordersModel.calculatePrice(obj);
      totalOrderPrice -= itemTotalPrice;
    }
    await ordersModel.updateTotalPrice(totalOrderPrice, orderNumber);
    removeItems.forEach(async (obj) => {
      await ordersModel.remove(orderNumber, obj.id, obj.quantity);
    });
    res.status(200).json({
      success: true,
      message: 'Data removed successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

module.exports = {
  view,
  add,
  update,
  remove,
};
