const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/menu/add-category', authMiddleware.verifyToken, menuController.addCategory);
router.delete('/menu/remove-category', authMiddleware.verifyToken, menuController.removeCategory);

router.post('/menu/add-item', authMiddleware.verifyToken, menuController.addMenuItem);
router.put('/menu/change-price', authMiddleware.verifyToken, menuController.changeItemPrice);
router.delete('/menu/remove-item', authMiddleware.verifyToken, menuController.removeMenuItem);

module.exports = router;
