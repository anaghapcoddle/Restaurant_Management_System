/* eslint-disable no-console */
const menuModel = require('../models/menu');

async function fetch(req, res) {
  try {
    const results = await menuModel.fetch();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetch,
};
