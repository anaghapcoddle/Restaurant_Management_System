const express = require('express');
const employeeController = require('../controllers/employee');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.get('/view', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('1'), employeeController.viewEmployee);
router.patch('/update', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('1'), employeeController.updateEmployee);
router.delete('/remove', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('1'), employeeController.removeEmployee);
router.get('/performance', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('1'), employeeController.employeePerformance);

module.exports = router;
