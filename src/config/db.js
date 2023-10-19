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

module.exports = con; 
