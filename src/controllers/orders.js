/* eslint-disable no-console */
const ordersModel = require('../models/orders');

function fetchOrders(req, res) {
  ordersModel.fetchOrdersData((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
}

module.exports = {
  fetchOrders,
};
