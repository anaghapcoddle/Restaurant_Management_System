/* eslint-disable no-console */
const ordersModel = require('../models/orders');

async function fetchOrders(req, res) {
  try {
    const results = await ordersModel.fetchOrdersData();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetchOrders,
};
