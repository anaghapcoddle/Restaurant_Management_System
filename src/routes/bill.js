const express = require('express');
const billController = require('../controllers/bill');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/createbill', authMiddleware.verifyToken, billController.createBill);

module.exports = router;
