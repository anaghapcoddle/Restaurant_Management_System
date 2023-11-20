const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/addCategory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('1'), menuController.addCategory);
router.patch('/disableCategory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.disableCategory);

router.post('/addItem', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.addMenuItem);
router.put('/changePrice', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.changeItemPrice);
router.delete('/removeItem', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), menuController.removeMenuItem);

module.exports = router;
