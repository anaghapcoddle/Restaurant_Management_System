const tableModel = require('../models/table');

async function addTableType(req, res) {
  const tableType = req.body.table_type;
  try {
    await tableModel.addTableType(tableType);
    res.status(201).json({ success: true, message: 'Table type added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function disableTableType(req, res) {
  try {
    const { tableType } = req.body;
    const status = req.body.isDisabled;
    await tableModel.disableTableType(status, tableType);
    if (status === '0') {
      return res.status(200).json({ success: true, message: 'Table type enabled successfully' });
    }
    return res.status(200).json({ success: true, message: 'Table type disabled successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

async function addTable(req, res) {
  try {
    const { capacity } = req.body;
    const { tableType } = req.body;
    const { availability } = req.body;
    await tableModel.addTable(capacity, tableType, availability);
    res.status(201).json({ success: true, message: 'Table added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function disableTable(req, res) {
  try {
    const tableId = req.body.tableNumber;
    const status = req.body.isDisabled;
    if (status === '0') {
      const isTableReserved = await tableModel.isTableReserved(tableId);
      if (isTableReserved) {
        return res.status(400).send({ success: false, message: 'Table already reservered for upcoming day. Cannot disable table now.' });
      }
      await tableModel.disableTable(status, tableId);
      return res.status(200).json({ success: true, message: 'Table disabled successfully' });
    }
    return res.status(200).json({ success: true, message: 'Table enabled successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  addTableType,
  disableTableType,
  addTable,
  disableTable,
};
