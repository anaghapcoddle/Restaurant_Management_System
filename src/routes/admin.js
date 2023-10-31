const express = require('express');
const adminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/employee/view', authMiddleware.verifyToken, adminController.viewEmployee);
router.post('/employee/update', authMiddleware.verifyToken, adminController.updateEmployee);
router.get('/employee/remove', authMiddleware.verifyToken, adminController.removeEmployee);
router.post('/menu/add-category', authMiddleware.verifyToken, adminController.addCategory);

module.exports = router;
