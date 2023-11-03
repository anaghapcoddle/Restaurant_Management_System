const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/add-table-type', authMiddleware.verifyToken, tableController.addTableType);
router.put('/disable-table-type', authMiddleware.verifyToken, tableController.disableTableType);
router.post('/add-table', authMiddleware.verifyToken, tableController.addTable);
router.put('/disable-table', authMiddleware.verifyToken, tableController.disableTable);

module.exports = router;
