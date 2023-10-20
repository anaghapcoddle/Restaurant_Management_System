const express = require('express');
const userController = require('../controllers/user');
const menuController = require('../controllers/menu');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.post('/signup', userController.signup);
router.get('/login', userController.login);
router.get('/fetchmenu', authMiddleware.verifyToken, menuController.fetchmenu);
router.get('/fetchorder', authMiddleware.verifyToken, ordersController.fetchOrders);

module.exports = router;
