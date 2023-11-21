const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/view', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([1]), ordersController.view);
router.post('/add', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), ordersController.add);
router.put('/update', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([3]), ordersController.update);
router.delete('/remove', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([4]), ordersController.remove);

module.exports = router;
