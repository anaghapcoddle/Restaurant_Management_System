const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.get('/sales', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.sales);
router.get('/orderHistory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.orderHistory);

module.exports = router;
