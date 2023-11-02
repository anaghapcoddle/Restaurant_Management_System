const menuModel = require('../models/menu');

let categoryName; let categoryId; let price; let availability;
let newPrice; let itemName;
// eslint-disable-next-line no-unused-vars
let success;

async function addCategory(req, res) {
  categoryName = req.body.category_name;
  try {
    await menuModel.addCategory(categoryName);
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
    await menuModel.removeCategory(categoryName);
    res.send('Category removed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function addMenuItem(req, res) {
  itemName = req.body.item_name;
  categoryId = req.body.category_id;
  price = req.body.price;
  availability = req.body.availability;
  try {
    await menuModel.addMenuItem(itemName, categoryId, price, availability);
    res.send('Menu item added successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function changeItemPrice(req, res) {
  itemName = req.body.item_name;
  newPrice = req.body.new_price;
  try {
    await menuModel.changeItemPrice(itemName, newPrice);
    res.send('Item price changed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function removeMenuItem(req, res) {
  itemName = req.body.item_name;
  try {
    await menuModel.removeMenuItem(itemName);
    res.send('Menu item removed successfully');
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
  addMenuItem,
  changeItemPrice,
  removeMenuItem,
};
