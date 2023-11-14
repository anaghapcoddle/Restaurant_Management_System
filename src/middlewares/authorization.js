const jwt = require('jsonwebtoken');

function authorizePage(permissions) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secret', (err, decoded) => {
        const userRole = decoded.role;
        if (err) {
          res.status(500).json({ success: false, message: 'Authentication failed' });
          console.error('Error:', err);
        }
        if (permissions.includes(userRole)) {
          next();
        } else {
          res.status(401).json({ success: false, message: 'You do not have permissions' });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Authorization failed' });
    }
  };
}

module.exports = {
  authorizePage,
};
