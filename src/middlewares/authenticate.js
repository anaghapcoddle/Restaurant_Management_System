const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      res.status(401).send({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.json({ success: false, message: 'Request Timeout. Please Re login' });
        } else {
          res.status(500).json({ success: false, message: 'Authentication failed' });
          console.error('Error:', err);
        }
      }
      next();
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Authentication failed' });
    console.error('Error:', error);
  }
}

module.exports = {
  verifyToken,
};
