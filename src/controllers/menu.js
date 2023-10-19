/* eslint-disable no-console */
const menuModel = require('../models/menu');

async function fetchmenu(req, res) {
  try {
    const results = await menuModel.fetchMenuData();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  fetchmenu,
};
