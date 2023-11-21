const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

function authorizePage(permissions) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secret', async (err, decoded) => {
        const userId = decoded.id;
        const userPermissions = await userModel.findPermission(userId);
        const userPermissionsArray = userPermissions.map((row) => row.permission_id);
        if (permissions.every((permission) => userPermissionsArray.includes(permission))) {
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
