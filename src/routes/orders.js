const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/fetch', authMiddleware.verifyToken, ordersController.fetch);
router.post('/add', authMiddleware.verifyToken, ordersController.add);
router.put('/update', authMiddleware.verifyToken, ordersController.update);
router.delete('/remove', authMiddleware.verifyToken, ordersController.remove);

module.exports = router;
