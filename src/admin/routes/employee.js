const express = require('express');
const employeeController = require('../controllers/employee');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.get('/view', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), employeeController.viewEmployee);
router.patch('/update', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), employeeController.updateEmployee);
router.delete('/remove', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), employeeController.removeEmployee);
router.get('/performance', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), employeeController.employeePerformance);

module.exports = router;
