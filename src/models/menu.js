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

function fetchMenuData(callback) {
  con.query('SELECT name, price, availability FROM menu', callback);
}

module.exports = {
  fetchMenuData,
};
