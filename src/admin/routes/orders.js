const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.get('/sales', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([1]), ordersController.sales);
router.get('/orderHistory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([1]), ordersController.orderHistory);

module.exports = router;
