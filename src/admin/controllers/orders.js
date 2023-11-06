const ordersModel = require('../models/orders');

let monthlySalesResult; let selectedRangeSalesResult;
let startDate; let endDate; let orderHistoryResult; let selectedRangeOrderHistoryResult;
let pageNumber; let previous; let next;
// eslint-disable-next-line no-unused-vars
let success;

async function monthlySales(req, res) {
  try {
    monthlySalesResult = await ordersModel.monthlySales();
    res.json(monthlySalesResult);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function selectedRangeSales(req, res) {
  startDate = req.body.start_date;
  endDate = req.body.end_date;
  try {
    selectedRangeSalesResult = await ordersModel.selectedRangeSales(startDate, endDate);
    res.json(selectedRangeSalesResult);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function orderHistoryInitialLoad(req, res) {
  pageNumber = req.body.page_number;
  previous = req.body.previous;
  next = req.body.next;
  // previousOrNext = req.body.previous_or_next;
  try {
    orderHistoryResult = await ordersModel.orderHistoryInitialLoad(pageNumber, previous, next);
    res.json(orderHistoryResult);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function selectedRangeOrderHistory(req, res) {
  startDate = req.body.start_date;
  endDate = req.body.end_date;
  try {
    selectedRangeOrderHistoryResult = await ordersModel.selectedRangeOrderHistory(startDate, endDate);
    res.json(selectedRangeOrderHistoryResult);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  monthlySales,
  selectedRangeSales,
  orderHistoryInitialLoad,
  selectedRangeOrderHistory,
};
