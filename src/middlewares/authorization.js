const jwt = require('jsonwebtoken');

function authorizePage(permissions) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secret', async (err, decoded) => {
        const userRole = decoded.role;
        // console.log(userRole);
        if (permissions.includes(userRole)) {
          next();
        } else {
          return res.status(401).json('You do not have permissions');
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
