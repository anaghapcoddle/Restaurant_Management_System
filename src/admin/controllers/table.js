const tableModel = require('../models/table');

let tableType; let capacity; let availability; let tableId; let status;
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

async function disableTableType(req, res) {
  status = req.body.is_disabled;
  tableType = req.body.table_type;
  try {
    await tableModel.disableTableType(status, tableType);
    if (status === '0') {
      res.send('Table type enabled successfully');
    } else {
      res.send('Table type disabled successfully');
    }
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
  disableTableType,
  addTable,
  removeTable,
};
