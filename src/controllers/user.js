/* eslint-disable no-console */
const userModel = require('../models/user');

function signup(req, res) {
  const { username, email, password } = req.body;
  userModel.addUser(username, email, password, (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Data inserted successfully');
    }
  });
}

function login(req, res) {
  const { username, password } = req.body;
  userModel.findUser(username, password, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 1) {
      res.status(200).send('Logged in successfully');
    } else {
      res.status(401).send('No user account found. Please sign up.');
    }
  });
}

module.exports = {
  signup,
  login,
};
