/* eslint-disable no-console */
const menuModel = require('../models/menu');

function fetchmenu(req, res) {
  menuModel.fetchMenuData((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
}

module.exports = {
  fetchmenu,
};
