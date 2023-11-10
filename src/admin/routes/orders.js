const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.get('/monthly-sales', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.monthlySales);
router.get('/selected-range-sales', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.selectedRangeSales);
router.get('/order-history', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.orderHistoryInitialLoad);
router.get('/selected-range-order-history', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.selectedRangeOrderHistory);

module.exports = router;
