const ordersModel = require('../models/orders');

async function monthlySales(req, res) {
  try {
    const monthlySalesResult = await ordersModel.monthlySales();
    res.status(201).json({ success: true, data: monthlySalesResult });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function selectedRangeSales(req, res) {
  try {
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const selectedRangeSalesResult = await ordersModel.selectedRangeSales(startDate, endDate);
    res.status(200).json({ success: true, data: selectedRangeSalesResult });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function orderHistoryInitialLoad(req, res) {
  try {
    const pageNumber = parseInt(req.body.page_number, 10);
    const previous = parseInt(req.body.previous, 10);
    const next = parseInt(req.body.next, 10);
    const orderHistoryResult = await ordersModel.orderHistoryInitialLoad(pageNumber, previous, next);
    res.status(200).json({ success: true, data: orderHistoryResult });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function selectedRangeOrderHistory(req, res) {
  try {
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    selectedRangeOrderHistoryResult = await ordersModel.selectedRangeOrderHistory(startDate, endDate);
    res.status(200).json({ success: true, data: selectedRangeOrderHistoryResult });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

module.exports = {
  monthlySales,
  selectedRangeSales,
  orderHistoryInitialLoad,
  selectedRangeOrderHistory,
};
