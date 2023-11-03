const reportsModel = require('../models/reports');

let monthlySalesResult; let selectedRangeSalesResult; let orderHistoryResult;
let startDate; let endDate;
// eslint-disable-next-line no-unused-vars
let success;

async function monthlySales(req, res) {
  try {
    monthlySalesResult = await reportsModel.monthlySales();
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
    selectedRangeSalesResult = await reportsModel.selectedRangeSales(startDate, endDate);
    res.json(selectedRangeSalesResult);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function orderHistory(req, res) {
  try {
    orderHistoryResult = await reportsModel.orderHistory();
    res.json(orderHistoryResult);
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
  orderHistory,
};
