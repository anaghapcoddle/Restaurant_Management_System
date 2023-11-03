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
  tableType = req.body.table_type;
  status = req.body.is_disabled;
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

async function disableTable(req, res) {
  tableId = req.body.table_number;
  status = req.body.is_disabled;
  try {
    if (status === '1') {
      const isTableReserved = await tableModel.isTableReserved(tableId);
      if (isTableReserved) {
        success = false;
        return res.status(400).send('Table already reservered for upcoming day. Cannot disable table now.');
      }
      await tableModel.disableTable(status, tableId);
      res.send('Table disabled successfully');
    } else {
      res.send('Table enabled successfully');
    }
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
  disableTable,
};
