const billModel = require('../models/bill');

async function createBill(req, res) {
  try {
    const orderId = req.body.order_id;
    const results = await billModel.createBill(orderId);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

module.exports = {
  createBill,
};
