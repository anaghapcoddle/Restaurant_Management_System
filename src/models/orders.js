/* eslint-disable no-console */
const mysql = require('mysql2');

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

function fetchOrdersData(callback) {
  con.query('SELECT * FROM orders', callback);
}

module.exports = {
  fetchOrdersData,
};
