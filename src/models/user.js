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

module.exports = {
  addUser,
  findUser,
};
