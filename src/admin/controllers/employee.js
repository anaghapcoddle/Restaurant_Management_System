const employeeModel = require('../models/employee');

async function viewEmployee(req, res) {
  try {
    const employeeId = req.body.employee_id;
    const viewResults = await employeeModel.viewEmployee(employeeId);
    res.status(200).json({
      success: true,
      data: viewResults,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function updateEmployee(req, res) {
  try {
    const employeeId = req.body.employee_id;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const { phone } = req.body;
    const { address } = req.body;
    const jobId = req.body.job_id;
    const { salary } = req.body;
    const { email } = req.body;
    await employeeModel.updateEmployee(firstName, lastName, phone, address, jobId, salary, email, employeeId);
    res.status(200).json({ success: true, message: 'Employee data updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removeEmployee(req, res) {
  try {
    const employeeId = req.body.employee_id;
    await employeeModel.removeEmployee(employeeId);
    res.status(204).json({ success: true, message: 'Employee data removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function employeePerformance(req, res) {
  try {
    const ordersResults = await employeeModel.employeePerformance();
    res.status(200).json({ success: true, data: ordersResults });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

module.exports = {
  viewEmployee,
  updateEmployee,
  removeEmployee,
  employeePerformance,
};
