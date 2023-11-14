const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

async function signup(req, res) {
  try {
    const signupUsername = req.body.username;
    const signupEmail = req.body.email;
    const signupPassword = req.body.password;
    if (!signupUsername || !signupEmail || !signupPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const isUserNameExisting = await userModel.findUser(signupUsername, signupPassword);
    if (isUserNameExisting.length !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Username is already in use',
      });
    }
    const signupResult = await userModel.addUser(signupUsername, signupEmail, signupPassword);
    res.status(201).json({
      success: true,
      message: `User account created successfully. Employee id is : ${signupResult}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.error('Error:', error);
  }
}

async function login(req, res) {
  try {
    const loginUsername = req.body.username;
    const loginPassword = req.body.password;
    const result = await userModel.findUser(loginUsername, loginPassword);
    if (result.length === 0) {
      res.status(500).json({ success: false, message: 'Login failed' });
    } else {
      const resp = {
        id: result[0].id,
        first_name: result[0].first_name,
        role: result[0].role,
      };
      const token = jwt.sign(resp, 'secret', { expiresIn: 86400 });
      res.status(200).send({ auth: true, success: true, token });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Login failed' });
    console.error('Error:', error);
  }
}

module.exports = {
  signup,
  login,
};
