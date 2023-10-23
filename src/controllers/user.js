/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

let signupUsername; let signupEmail; let signupPassword;

async function signup(req, res) {
  signupUsername = req.body.username;
  signupEmail = req.body.email;
  signupPassword = req.body.password;
  try {
    await userModel.addUser(signupUsername, signupEmail, signupPassword);
    res.send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Internal Server Error');
  }
}

let loginUsername; let loginPassword;

async function login(req, res) {
  loginUsername = req.body.username;
  loginPassword = req.body.password;
  try {
    const result = await userModel.findUser(loginUsername, loginPassword);
    if (result.length === 0) {
      res.status(500).send({ error: 'Login failed' });
    } else {
      const resp = {
        id: result[0].id,
        display_name: result[0].display_name,
      };
      const token = jwt.sign(resp, 'secret', { expiresIn: 86400 });
      res.status(200).send({ auth: true, token });
    }
  } catch (error) {
    res.status(500).send({ error: 'Login failed' });
  }
}

module.exports = {
  signup,
  login,
};
