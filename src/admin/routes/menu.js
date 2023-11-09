const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/add-category', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'));
//router.post('/add-category', authMiddleware.verifyToken, menuController.addCategory);
router.delete('/remove-category', authMiddleware.verifyToken, menuController.removeCategory);

router.post('/add-item', authMiddleware.verifyToken, menuController.addMenuItem);
router.put('/change-price', authMiddleware.verifyToken, menuController.changeItemPrice);
router.delete('/remove-item', authMiddleware.verifyToken, menuController.removeMenuItem);

module.exports = router;
