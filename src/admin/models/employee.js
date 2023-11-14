const dbconfig = require('../../config/db');

async function viewEmployee(employeeId) {
  const db = dbconfig.makeDb();
  try {
    const viewResults = await db.query('SELECT * FROM employee WHERE id = ?', [employeeId]);
    await db.close();
    return viewResults;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateEmployee(firstName, lastName, phone, address, jobId, salary, email, employeeId) {
  const db = dbconfig.makeDb();
  try {
    await db.query(
      'UPDATE employee SET first_name = ? ,last_name = ? ,phone = ? ,address = ? ,job_id = ? ,salary = ?, email = ? WHERE id = ?',
      [firstName, lastName, phone, address, jobId, salary, email, employeeId],
    );
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function removeEmployee(employeeId) {
  const db = dbconfig.makeDb();
  try {
    await db.query('DELETE FROM employee WHERE id = ?', [employeeId]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function employeePerformance() {
  const db = dbconfig.makeDb();
  try {
    const ordersQuery = `
    SELECT CONCAT(employee.first_name," ",employee.last_name) AS 'Employee Name', COUNT(employee_id) AS 'Number of orders taken'
    FROM employee
    INNER JOIN orders ON employee.id=orders.employee_id
    WHERE orders.created>now() - interval 1 month
    GROUP BY employee_id
    ORDER BY COUNT(employee_id) DESC;
    `;
    const ordersResult = await db.query(ordersQuery);
    await db.close();
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
