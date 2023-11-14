const menuModel = require('../models/menu');

async function addCategory(req, res) {
  try {
    const categoryName = req.body.category_name;
    await menuModel.addCategory(categoryName);
    res.status(201).json({ success: true, message: 'Category added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removeCategory(req, res) {
  try {
    const categoryName = req.body.category_name;
    await menuModel.removeCategory(categoryName);
    res.status(204).json({ success: true, message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function addMenuItem(req, res) {
  try {
    const itemName = req.body.item_name;
    const categoryId = req.body.category_id;
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
    const itemName = req.body.item_name;
    const newPrice = req.body.new_price;
    await menuModel.changeItemPrice(itemName, newPrice);
    res.status(200).json({ success: true, message: 'Item price changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removeMenuItem(req, res) {
  const itemName = req.body.item_name;
  try {
    await menuModel.removeMenuItem(itemName);
    // res.send('Menu item removed successfully');
    // success = true;
    res.status(204).json({ success: true, message: 'Item price changed successfully' });
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
