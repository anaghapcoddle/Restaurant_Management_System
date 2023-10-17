/* eslint-disable no-console */
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ANAGHA123',
  database: 'anagha',
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

function addUser(username, email, password, callback) {
  con.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], callback);
}

function findUser(username, password, callback) {
  con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], callback);
}

module.exports = {
  addUser,
  findUser,
};
