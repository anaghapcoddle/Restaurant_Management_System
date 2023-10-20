/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

async function signup(req, res) {
  const { username, email, password } = req.body;
  try {
    await userModel.addUser(username, email, password);
    res.send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Internal Server Error');
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const result = await userModel.findUser(username, password);
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
