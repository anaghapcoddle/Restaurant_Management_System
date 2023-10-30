const express = require('express');
const adminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.post('/employee/view', authMiddleware.verifyToken, adminController.viewEmployee);
router.post('/employee/update', authMiddleware.verifyToken, adminController.updateEmployee);
router.get('/employee/remove', authMiddleware.verifyToken, adminController.removeEmployee);

module.exports = router;
