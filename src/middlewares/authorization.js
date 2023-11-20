const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

function authorizePage(permissions) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secret', async (err, decoded) => {
        const userRole = decoded.role;
        // const userPermissions = await userModel.findPermission(userId);
        // const userPermissionsArray = userPermissions.map((item) => item.permission_id);
        console.log(userRole);
        console.log(permissions);

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
