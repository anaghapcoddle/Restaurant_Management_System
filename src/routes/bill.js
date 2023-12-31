const express = require('express');
const billController = require('../controllers/bill');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/createbill', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), billController.createBill);

module.exports = router;
