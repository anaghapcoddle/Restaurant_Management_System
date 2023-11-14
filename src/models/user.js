const dbconfig = require('../config/db');

async function addUser(username, email, password) {
  const db = dbconfig.makeDb();
  try {
    const result = await db.query('INSERT INTO employee (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    const empId = result.insertId;
    await db.close();
    return empId;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function findUser(username, password) {
  const db = dbconfig.makeDb();
  try {
    const findUserResult = await db.query('SELECT * FROM employee WHERE username = ? AND password = ?', [username, password]);
    await db.close();
    return findUserResult;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  addUser,
  findUser,
};
