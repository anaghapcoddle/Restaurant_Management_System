const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.post('/signup', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin']), userController.signup);
router.get('/login', userController.login);

module.exports = router;
