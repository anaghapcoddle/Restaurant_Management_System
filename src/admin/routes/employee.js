const express = require('express');
const employeeController = require('../controllers/employee');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/employee/view', authMiddleware.verifyToken, employeeController.viewEmployee);
router.post('/employee/update', authMiddleware.verifyToken, employeeController.updateEmployee);
router.delete('/employee/remove', authMiddleware.verifyToken, employeeController.removeEmployee);
router.get('/employee/performance', authMiddleware.verifyToken, employeeController.employeePerformance);

module.exports = router;
