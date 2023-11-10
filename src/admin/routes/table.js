const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/add-table-type', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.addTableType);
router.put('/disable-table-type', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.disableTableType);
router.post('/add-table', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.addTable);
router.put('/disable-table', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.disableTable);

module.exports = router;
