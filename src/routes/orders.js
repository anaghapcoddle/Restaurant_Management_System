const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/fetch', authMiddleware.verifyToken, ordersController.fetch);
router.post('/add', authMiddleware.verifyToken, ordersController.add);

module.exports = router;
