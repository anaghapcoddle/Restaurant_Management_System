/* eslint-disable no-useless-catch */
const tableModel = require('../models/table');

// eslint-disable-next-line no-unused-vars
let success;
let name; let phone; let email; let date; let time; let table; let guest;
let viewReservationResults;

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

async function viewReservation(req, res) {
  try {
    viewReservationResults = await tableModel.viewReservation();
    res.json(viewReservationResults);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function cancelReservation(req, res) {
  name = req.body.name;
  phone = req.body.phone;
  date = req.body.date;
  try {
    await tableModel.cancelReservation(name, phone, date);
    res.send('Reservation cancelled successfully.');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  reserveTable,
  viewReservation,
  cancelReservation,
};
