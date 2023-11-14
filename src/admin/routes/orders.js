const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.get('/monthlySales', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.monthlySales);
router.get('/selectedRangeSales', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.selectedRangeSales);
router.get('/orderHistory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.orderHistoryInitialLoad);
router.get('/selectedRangeOrderHistory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), ordersController.selectedRangeOrderHistory);

module.exports = router;
