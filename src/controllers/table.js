const tableModel = require('../models/table');

let viewReservationResults;

async function reserveTable(req, res) {
  try {
    const { name } = req.body;
    const { phone } = req.body;
    const { email } = req.body;
    const { date } = req.body;
    const { time } = req.body;
    const { table } = req.body;
    const { guest } = req.body;
    if (!name || !phone || !email || !date || !time || !table || !guest) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const phoneno = /^\d{10}$/;
    if (!phone.match(phoneno)) {
      return res.status(400).json({ success: false, error: 'Not a valid number or does not contain 10 digits' });
    }

    if (phone.toString().length !== 10) {
      return res.status(400).json({ success: false, error: 'Number must contain 10 digits' });
    }

    const isTableOccupied = await tableModel.isTableOccupied(table, date, time);
    if (isTableOccupied) {
      res.status(400).json({
        success: false,
        message: 'Table already booked. Please select another table, date or time',
      });
    }
    await tableModel.reserveTable(name, phone, email, date, time, table, guest);
    res.status(201).json({
      success: true,
      message: 'Data inserted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function viewReservation(req, res) {
  try {
    viewReservationResults = await tableModel.viewReservation();
    res.status(200).json({
      success: true,
      data: viewReservationResults,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function cancelReservation(req, res) {
  try {
    const { name } = req.body;
    const { phone } = req.body;
    const { date } = req.body;
    await tableModel.cancelReservation(name, phone, date);
    res.status(204).json({
      success: true,
      message: 'Reservation cancelled successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

module.exports = {
  reserveTable,
  viewReservation,
  cancelReservation,
};
