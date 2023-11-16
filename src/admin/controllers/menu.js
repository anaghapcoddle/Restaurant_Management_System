const menuModel = require('../models/menu');

async function addCategory(req, res) {
  try {
    const { categoryName } = req.body;
    await menuModel.addCategory(categoryName);
    res.status(201).json({ success: true, message: 'Category added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removeCategory(req, res) {
  try {
    const { categoryName } = req.body;
    await menuModel.removeCategory(categoryName);
    res.status(204).json({ success: true, message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function addMenuItem(req, res) {
  try {
    const { itemName } = req.body;
    const { categoryId } = req.body;
    const { price } = req.body;
    const { availability } = req.body;
    await menuModel.addMenuItem(itemName, categoryId, price, availability);
    res.status(201).json({ success: true, message: 'Menu item added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function changeItemPrice(req, res) {
  try {
    const { itemName } = req.body;
    const { newPrice } = req.body;
    await menuModel.changeItemPrice(itemName, newPrice);
    res.status(200).json({ success: true, message: 'Item price changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removeMenuItem(req, res) {
  const { itemName } = req.body;
  try {
    await menuModel.removeMenuItem(itemName);
    res.status(204).json({ success: true, message: 'Menu item removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

module.exports = {
  addCategory,
  removeCategory,
  addMenuItem,
  changeItemPrice,
  removeMenuItem,
};
