const employeeModel = require('../models/employee');

async function viewEmployee(req, res) {
  try {
    const { employeeId } = req.body;
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
    const {
      employeeId,
      firstName,
      lastName,
      phone,
      address,
      jobId,
      salary,
      email,
      roleId,
    } = req.body;

    const employeeData = {
      employeeId,
      firstName,
      lastName,
      phone,
      address,
      jobId,
      salary,
      email,
      roleId,
    };

    await employeeModel.updateEmployee(employeeData);
    res.status(200).json({ success: true, message: 'Employee data updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removeEmployee(req, res) {
  try {
    const { employeeId } = req.body;
    await employeeModel.removeEmployee(employeeId);
    res.status(200).json({ success: true, message: 'Employee data removed successfully' });
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

async function addPermission(req, res) {
  try {
    const { employeeId } = req.body;
    const { permissionId } = req.body;
    await employeeModel.addPermission(employeeId, permissionId);
    res.status(200).json({ success: true, message: 'Added permission successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function removePermission(req, res) {
  try {
    const { employeeId } = req.body;
    const { permissionId } = req.body;
    await employeeModel.removePermission(employeeId, permissionId);
    res.status(200).json({ success: true, message: 'Removed permission successfully' });
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
  addPermission,
  removePermission,
};
