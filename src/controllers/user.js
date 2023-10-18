/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
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
  userModel.findUser(username, password, (error, result) => {
    if (error || result.length === 0) {
      res.status(500).send({ error: 'Login failed' });
    } else {
      const resp = {
        id: result[0].id,
        display_name: result[0].display_name,
      };
      // console.log(resp);
      const token = jwt.sign(resp, 'secret', { expiresIn: 86400 });
      // res.status(200).send('Logged in successully');
      res.status(200).send({ auth: true, token });
    }
  });
}

module.exports = {
  signup,
  login,
};
