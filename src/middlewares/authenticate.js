// const menuModel = require('../models/menu');

const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
let success;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).send({ error: 'No token provided' });
    success = false;
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, 'secret');
    next();
  } catch (error) {
    res.status(500).send({ error: 'Authentication failed' });
    throw error;
  }
}

module.exports = {
  verifyToken,
};
