const jwt = require('jsonwebtoken');

function authorizePage(permissions) {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let userRole;

    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.status(401).send({ error: 'Authentication failed' });
      } else {
        userRole = decoded.role;
        console.log(userRole);
        if (permissions.includes(userRole)) {
          next();
        } else {
          return res.status(401).json('You do not have permissions');
        }
      }
    });
  };
}

module.exports = {
  authorizePage,
};
