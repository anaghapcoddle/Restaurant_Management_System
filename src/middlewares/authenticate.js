const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      res.status(401).send({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret');
    next();
  } catch (error) {
    res.status(500).send({ success: false, message: 'Authentication failed' });
    console.error('Error:', error);
  }
}

module.exports = {
  verifyToken,
};
