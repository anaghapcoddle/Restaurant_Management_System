const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/add-category', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.addCategory);
router.delete('/remove-category', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.removeCategory);

router.post('/add-item', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.addMenuItem);
router.put('/change-price', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.changeItemPrice);
router.delete('/remove-item', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.removeMenuItem);

module.exports = router;
