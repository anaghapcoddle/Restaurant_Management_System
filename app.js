const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ANAGHA123',
  database: 'restaurantdb',
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

app.post('/signup', (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  con.query('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      res.send('Data inserted successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running.');
});
