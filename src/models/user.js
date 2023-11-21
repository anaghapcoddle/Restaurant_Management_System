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
  let combinedArray;
  try {
    const rolePermissionQuery = `
    SELECT rp.permission_id
    FROM employee e
    JOIN role_permission rp ON e.role_id = rp.role_id
    WHERE e.id = ?;
    `;
    const rolePermissionResult = await db.query(rolePermissionQuery, [userId]);
    const userPermissionQuery = `
    SELECT permission_id
    FROM user_permission
    WHERE employee_id = ?;
    `;
    const userPermissionResult = await db.query(userPermissionQuery, [userId]);
    combinedArray = rolePermissionResult.concat(userPermissionResult);
    db.close();
  } catch (error) {
    console.error('Error:', error);
  }
  return combinedArray;
}

module.exports = {
  addUser,
  findUser,
  findPermission,
};
