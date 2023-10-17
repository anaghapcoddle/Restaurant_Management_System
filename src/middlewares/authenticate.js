// const menuModel = require('../models/menu');

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).send({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      res.status(500).send({ error: 'Authentication failed' });
    } else {
      next();
    }
  });
}

module.exports = {
  verifyToken,
};
