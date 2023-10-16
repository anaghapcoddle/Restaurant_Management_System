/* eslint-disable no-console */
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
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  con.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      res.send('Data inserted successfully');
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 1) {
      res.status(200).send('Logged in successfully');
    } else {
      res.status(401).send('No user accound found. Please sign');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running.');
});
