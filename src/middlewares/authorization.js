function authorizePage(permissions) {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permissions.includes(userRole)) {
      // next();
      // return res.status(401).json('You dont have permission');
      res.send('You have permission');
    } else {
      return res.status(401).json('You dont have permission');
    }
  };
}

module.exports = {
  authorizePage,
};
