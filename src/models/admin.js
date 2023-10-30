/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../config/db');

async function viewEmployee(employeeId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    const viewResults = await query('SELECT * FROM employee WHERE id = ?', [employeeId]);
    console.log(viewResults);
    con.end((err) => {
      if (err) throw err;
    });
    return viewResults;
  } catch (error) {
    throw error;
  }
}

async function updateEmployee(firstName, lastName, phone, address, jobId, salary, email, employeeID) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) throw err;
    });
    await query(
      'UPDATE employee SET first_name = ? ,last_name = ? ,phone = ? ,address = ? ,job_id = ? ,salary = ?, email = ? WHERE id = ?',
      [firstName, lastName, phone, address, jobId, salary, email, employeeID],
    );
    con.end((err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  viewEmployee,
  updateEmployee,
};
