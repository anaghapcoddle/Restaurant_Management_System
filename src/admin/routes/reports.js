const express = require('express');
const reportsController = require('../controllers/reports');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/monthly-sales', authMiddleware.verifyToken, reportsController.monthlySales);
router.get('/selected-range-sales', authMiddleware.verifyToken, reportsController.selectedRangeSales);
router.get('/order-history', authMiddleware.verifyToken, reportsController.orderHistory);

module.exports = router;
