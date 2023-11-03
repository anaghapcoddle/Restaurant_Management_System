const express = require('express');
const employeeController = require('../controllers/employee');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/view', authMiddleware.verifyToken, employeeController.viewEmployee);
router.post('/update', authMiddleware.verifyToken, employeeController.updateEmployee);
router.delete('/remove', authMiddleware.verifyToken, employeeController.removeEmployee);
router.get('/performance', authMiddleware.verifyToken, employeeController.employeePerformance);

module.exports = router;
