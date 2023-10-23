/* eslint-disable no-console */
const ordersModel = require('../models/orders');

let fetchResults;
let success;

async function fetch(req, res) {
  try {
    fetchResults = await ordersModel.fetch();
    res.json(fetchResults);
    success = true;
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    success = false;
  }
}

module.exports = {
  fetch,
};
