const reportsModel = require('../models/reports');

let monthlySalesResult;
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

module.exports = {
  monthlySales,
};
