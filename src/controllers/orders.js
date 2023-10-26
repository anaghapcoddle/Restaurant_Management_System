/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const ordersModel = require('../models/orders');

let fetchResults;
// eslint-disable-next-line no-unused-vars
let success;
let employeeId; let diningTableId; let type; let status; let deliveryStatus; let items;

async function fetch(req, res) {
  try {
    fetchResults = await ordersModel.fetch();
    res.json(fetchResults);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function add(req, res) {
  employeeId = req.body.employee_id;
  diningTableId = req.body.dining_table_id;
  type = req.body.type;
  status = req.body.status;
  deliveryStatus = req.body.delivery_status;
  items = [];

  for (let i = 0; req.body[`item${i}_name`]; i += 1) {
    const item = {
      name: req.body[`item${i}_name`],
      quantity: parseFloat(req.body[`item${i}_quantity`]),
    };
    items.push(item);
  }
  try {
    await ordersModel.add(employeeId, diningTableId, type, status, deliveryStatus, items);
    res.send('Data inserted successfully');
    success = true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetch,
  add,
};
