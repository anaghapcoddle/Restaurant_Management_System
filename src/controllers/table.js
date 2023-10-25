/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const tableModel = require('../models/table');

// eslint-disable-next-line no-unused-vars
let success;
let name; let phone; let email; let date; let time; let table; let guest;

async function reserveTable(req, res) {
  name = req.body.name;
  phone = req.body.phone;
  email = req.body.email;
  date = req.body.date;
  time = req.body.time;
  table = req.body.table;
  guest = req.body.guest;

  const isTableOccupied = await tableModel.isTableOccupied(table, date, time);

  if (isTableOccupied) {
    success = false;
    return res.status(400).send('Table already booked. Please select another table, date or time.');
  }

  try {
    await tableModel.reserveTable(name, phone, email, date, time, table, guest);
    res.send('Data inserted successfully');
    success = true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  reserveTable,
};
