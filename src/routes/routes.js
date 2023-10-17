const express = require('express');
const userController = require('../controllers/user');
const menuController = require('../controllers/menu');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/fetchmenu', menuController.fetchmenu);

module.exports = router;
