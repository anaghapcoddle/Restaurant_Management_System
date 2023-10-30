const express = require('express');
const adminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.put('/employee/edit', authMiddleware.verifyToken, adminController.editEmployee);

module.exports = router;
