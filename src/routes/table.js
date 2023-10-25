const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.post('/reserve', authMiddleware.verifyToken, tableController.reserveTable);

module.exports = router;
