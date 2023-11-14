const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

async function viewEmployee(employeeId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const viewResults = await query('SELECT * FROM employee WHERE id = ?', [employeeId]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return viewResults;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateEmployee(firstName, lastName, phone, address, jobId, salary, email, employeeId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query(
      'UPDATE employee SET first_name = ? ,last_name = ? ,phone = ? ,address = ? ,job_id = ? ,salary = ?, email = ? WHERE id = ?',
      [firstName, lastName, phone, address, jobId, salary, email, employeeId],
    );
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function removeEmployee(employeeId) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query('DELETE FROM employee WHERE id = ?', [employeeId]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function employeePerformance() {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    const ordersQuery = `
    SELECT CONCAT(employee.first_name," ",employee.last_name) AS 'Employee Name', COUNT(employee_id) AS 'Number of orders taken'
    FROM employee
    INNER JOIN orders ON employee.id=orders.employee_id
    WHERE orders.created>now() - interval 1 month
    GROUP BY employee_id
    ORDER BY COUNT(employee_id) DESC;
    `;
    const ordersResult = await query(ordersQuery);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    return ordersResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  viewEmployee,
  updateEmployee,
  removeEmployee,
  employeePerformance,
};
