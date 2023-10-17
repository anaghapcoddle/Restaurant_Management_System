const express = require('express');
const userController = require('../controllers/user');
const menuController = require('../controllers/menu');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/fetchmenu', authMiddleware.verifyToken, menuController.fetchmenu);

module.exports = router;
