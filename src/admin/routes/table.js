const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/table/add-table-type', authMiddleware.verifyToken, tableController.addTableType);
router.put('/table/disable-table-type', authMiddleware.verifyToken, tableController.disableTableType);
router.post('/table/add-table', authMiddleware.verifyToken, tableController.addTable);
router.delete('/table/remove-table', authMiddleware.verifyToken, tableController.removeTable);

module.exports = router;
