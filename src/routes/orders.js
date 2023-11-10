const express = require('express');
const ordersController = require('../controllers/orders');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/fetch', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), ordersController.fetch);
router.post('/add', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), ordersController.add);
router.put('/update', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), ordersController.update);
router.delete('/remove', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), ordersController.remove);

module.exports = router;
