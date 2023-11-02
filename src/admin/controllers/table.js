/* eslint-disable no-console */
const tableModel = require('../models/table');

let tableType; let capacity; let availability; let tableId;
// eslint-disable-next-line no-unused-vars
let success;

async function addTableType(req, res) {
  tableType = req.body.table_type;
  try {
    await tableModel.addTableType(tableType);
    res.send('Table type added successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function removeTableType(req, res) {
  tableType = req.body.table_type;
  try {
    await tableModel.removeTableType(tableType);
    res.send('Table type removed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function addTable(req, res) {
  capacity = req.body.capacity;
  tableType = req.body.table_type;
  availability = req.body.availability;
  try {
    await tableModel.addTable(capacity, tableType, availability);
    res.send('Table added successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function removeTable(req, res) {
  tableId = req.body.table_number;
  try {
    await tableModel.removeTable(tableId);
    res.send('Table removed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  addTableType,
  removeTableType,
  addTable,
  removeTable,
};
