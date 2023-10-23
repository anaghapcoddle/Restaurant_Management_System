/* eslint-disable no-console */
const menuModel = require('../models/menu');

let fetchResults;

async function fetch(req, res) {
  try {
    fetchResults = await menuModel.fetch();
    res.json(fetchResults);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetch,
};
