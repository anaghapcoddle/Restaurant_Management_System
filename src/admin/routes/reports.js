const express = require('express');
const reportsController = require('../controllers/reports');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/reports/daily-sales', authMiddleware.verifyToken, reportsController.dailySales);

module.exports = router;
