/* eslint-disable no-console */
const ordersModel = require('../models/orders');

async function fetch(req, res) {
  try {
    const results = await ordersModel.fetch();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetch,
};
