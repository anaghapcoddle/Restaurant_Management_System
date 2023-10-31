const express = require('express');
const adminController = require('../controllers/menu');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/menu/add-category', authMiddleware.verifyToken, adminController.addCategory);
router.delete('/menu/remove-category', authMiddleware.verifyToken, adminController.removeCategory);

module.exports = router;
