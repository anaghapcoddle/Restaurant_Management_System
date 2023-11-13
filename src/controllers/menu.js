const menuModel = require('../models/menu');

async function fetch(req, res) {
  try {
    const results = await menuModel.fetch();
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    console.error('Error:', error);
  }
}

async function updateAvailability(req, res) {
  try {
    const { item } = req.body;
    const status = req.body.availabity_status;
    await menuModel.updateAvailability(item, status);
    res.status(500).json({
      success: true,
      message: 'Data changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
    console.error('Error:', error);
  }
}

module.exports = {
  fetch,
  updateAvailability,
};
