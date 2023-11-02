const reportsModel = require('../models/reports');

let dailySalesResult;
// eslint-disable-next-line no-unused-vars
let success;

async function dailySales(req, res) {
  try {
    dailySalesResult = await reportsModel.dailySales();
    res.json(dailySalesResult);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  dailySales,
};
