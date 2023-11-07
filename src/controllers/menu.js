const menuModel = require('../models/menu');

let fetchResults; let item; let status;
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

async function updateAvailability(req, res) {
  item = req.body.item;
  status = req.body.availabity_status;
  try {
    await menuModel.updateAvailability(item, status);
    res.send('Data changed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  fetch,
  updateAvailability,
};
