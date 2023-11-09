const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

let signupUsername; let signupEmail; let signupPassword; let signupResult; let message;
// eslint-disable-next-line no-unused-vars
let success;

async function signup(req, res) {
  signupUsername = req.body.username;
  signupEmail = req.body.email;
  signupPassword = req.body.password;
  if (!signupUsername || !signupEmail || !signupPassword) {
    success = false;
    return res.status(400).send('All fields are required');
  }

  const isUserNameExisting = await userModel.findUser(signupUsername, signupPassword);
  if (isUserNameExisting.length !== 0) {
    success = false;
    return res.status(400).send('Username is already in use');
  }

  try {
    signupResult = await userModel.addUser(signupUsername, signupEmail, signupPassword);
    message = `User account created successfully. Employee id is : ${signupResult}`;
    res.send(message);
    success = true;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    success = false;
    throw error;
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
      success = false;
    } else {
      const resp = {
        id: result[0].id,
        first_name: result[0].first_name,
      };
      const token = jwt.sign(resp, 'secret', { expiresIn: 86400 });
      res.status(200).send({ auth: true, token });
      success = true;
    }
  } catch (error) {
    res.status(500).send({ error: 'Login failed' });
    success = false;
  }
}

module.exports = {
  signup,
  login,
};
