/* eslint-disable no-console */
const editEmployeeModel = require('../models/admin');

let firstName; let lastName; let phone; let address; let jobId; let salary; let email; let employeeId;
// eslint-disable-next-line no-unused-vars
let success;

async function editEmployee(req, res) {
  employeeId = req.body.employee_id;
  firstName = req.body.first_name;
  lastName = req.body.last_name;
  phone = req.body.phone;
  address = req.body.address;
  jobId = req.body.job_id;
  salary = req.body.salary;
  email = req.body.email;
  try {
    await editEmployeeModel.editEmployee(firstName, lastName, phone, address, jobId, salary, email, employeeId);
    res.send('Employee data updated successfully');
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
  }
}

module.exports = {
  editEmployee,
};
