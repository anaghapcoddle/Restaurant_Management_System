const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/addCategory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), menuController.addCategory);
router.patch('/disableCategory', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([4]), menuController.disableCategory);

router.post('/addItem', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), menuController.addMenuItem);
router.put('/changePrice', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([3]), menuController.changeItemPrice);
router.delete('/removeItem', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([4]), menuController.removeMenuItem);

module.exports = router;
