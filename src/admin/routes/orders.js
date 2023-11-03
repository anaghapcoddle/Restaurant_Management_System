const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/monthly-sales', authMiddleware.verifyToken, ordersController.monthlySales);
router.get('/selected-range-sales', authMiddleware.verifyToken, ordersController.selectedRangeSales);
router.get('/order-history', authMiddleware.verifyToken, ordersController.orderHistory);
router.get('/selected-range-order-history', authMiddleware.verifyToken, ordersController.selectedRangeOrderHistory);

module.exports = router;
