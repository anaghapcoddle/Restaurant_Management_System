/* eslint-disable no-console */
const adminModel = require('../models/menu');

let categoryName;
// eslint-disable-next-line no-unused-vars
let success;

async function addCategory(req, res) {
  categoryName = req.body.category_name;
  try {
    await adminModel.addCategory(categoryName);
    res.send('Category added successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function removeCategory(req, res) {
  categoryName = req.body.category_name;
  try {
    await adminModel.removeCategory(categoryName);
    res.send('Category removed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  addCategory,
  removeCategory,
};
