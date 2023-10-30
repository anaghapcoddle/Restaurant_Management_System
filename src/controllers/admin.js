/* eslint-disable no-console */
const adminModel = require('../models/admin');

let firstName; let lastName; let phone; let address; let jobId;
let salary; let email; let employeeId; let viewResults;
// eslint-disable-next-line no-unused-vars
let success;

async function viewEmployee(req, res) {
  employeeId = req.body.employee_id;
  try {
    viewResults = await adminModel.viewEmployee(employeeId);
    res.json(viewResults);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function updateEmployee(req, res) {
  employeeId = req.body.employee_id;
  firstName = req.body.first_name;
  lastName = req.body.last_name;
  phone = req.body.phone;
  address = req.body.address;
  jobId = req.body.job_id;
  salary = req.body.salary;
  email = req.body.email;
  try {
    await adminModel.updateEmployee(firstName, lastName, phone, address, jobId, salary, email, employeeId);
    res.send('Employee data updated successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

async function removeEmployee(req, res) {
  employeeId = req.body.employee_id;
  try {
    await adminModel.removeEmployee(employeeId);
    res.send('Employee data removed successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  viewEmployee,
  updateEmployee,
  removeEmployee,
};
