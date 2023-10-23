/* eslint-disable no-console */
const menuModel = require('../models/menu');

let fetchResults;
// eslint-disable-next-line no-unused-vars
let success;

async function fetch(req, res) {
  try {
    fetchResults = await menuModel.fetch();
    res.json(fetchResults);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  fetch,
};
