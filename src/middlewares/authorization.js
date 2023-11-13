const jwt = require('jsonwebtoken');

function authorizePage(permissions) {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'secret', async (err, decoded) => {
      try {
        if (err) {
          res.status(401).send({ error: 'Authentication failed' });
        } else {
          const userRole = decoded.role;
          // console.log(userRole);

          if (permissions.includes(userRole)) {
            next();
          } else {
            return res.status(401).json('You do not have permissions');
          }
        }
      } catch (error) {
        res.status(401).send({ error: 'Authentication failed' });
      }
    });
  };
}

module.exports = {
  authorizePage,
};
