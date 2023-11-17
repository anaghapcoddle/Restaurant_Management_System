const ordersModel = require('../models/orders');

async function sales(req, res) {
  try {
    const { startDate } = req.body;
    const { endDate } = req.body;
    if (startDate === '' || endDate === '') {
      return res.status(400).json({
        success: false,
        message: 'Select start date and end date',
      });
    }
    const salesResult = await ordersModel.sales(startDate, endDate);
    return res.status(200).json({ success: true, data: salesResult });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

async function orderHistory(req, res) {
  try {
    const pageNumber = parseInt(req.body.pageNumber, 10);
    const previous = parseInt(req.body.previous, 10);
    const next = parseInt(req.body.next, 10);
    const { startDate } = req.body;
    const { endDate } = req.body;
    if (startDate === '' || endDate === '') {
      return res.status(400).json({
        success: false,
        message: 'Select start date and end date',
      });
    }
    const result = await ordersModel.orderHistory(pageNumber, previous, next);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  sales,
  orderHistory,
};
