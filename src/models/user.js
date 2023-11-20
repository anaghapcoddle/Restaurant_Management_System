const dbconfig = require('../config/db');

async function addUser(username, email, password) {
  const db = dbconfig.makeDb();
  let empId;
  try {
    const result = await db.query('INSERT INTO employee (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    empId = result.insertId;
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return empId;
}

async function findUser(username, password) {
  const db = dbconfig.makeDb();
  let findUserResult;
  try {
    findUserResult = await db.query('SELECT * FROM employee WHERE username = ? AND password = ?', [username, password]);
    await db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return findUserResult;
}

async function findPermission(userId) {
  const db = dbconfig.makeDb();
  let result;
  try {
    const findPermissionQuery = `
    SELECT rp.permission_id
    FROM employee e
    JOIN user_roles ur ON e.id = ur.employee_id
    JOIN role_permission rp ON ur.role_id = rp.role_id
    WHERE e.id = ?;
    `;
    result = await db.query(findPermissionQuery, [userId]);
    db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
}

module.exports = {
  addUser,
  findUser,
  findPermission,
};
