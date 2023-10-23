/* eslint-disable no-console */
const ordersModel = require('../models/orders');

let fetchResults;

async function fetch(req, res) {
  try {
    fetchResults = await ordersModel.fetch();
    res.json(fetchResults);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetch,
};
