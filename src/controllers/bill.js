const billModel = require('../models/bill');

let billResults; let orderId;
// eslint-disable-next-line no-unused-vars
let success;

async function createBill(req, res) {
  orderId = req.body.order_id;
  try {
    billResults = await billModel.createBill(orderId);
    res.json(billResults);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  createBill,
};
