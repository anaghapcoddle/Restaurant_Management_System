const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/addTableType', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.addTableType);
router.put('/disableTableType', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.disableTableType);
router.post('/addTable', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.addTable);
router.put('/disableTable', authMiddleware.verifyToken, authorizeMiddleware.authorizePage('admin'), tableController.disableTable);

module.exports = router;
