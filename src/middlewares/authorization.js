const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

function authorizePage(permissions) {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, 'secret');
      const userId = decoded.id;
      const userPermissions = await userModel.findPermission(userId);
      const userPermissionsArray = userPermissions.map((row) => row.permission_id);
      if (permissions.every((permission) => userPermissionsArray.includes(permission))) {
        return next();
      }
      return res.status(401).json({ success: false, message: 'You do not have permissions' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Authorization failed' });
    }
  };
}

module.exports = {
  authorizePage,
};
