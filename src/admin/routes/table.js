const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../../middlewares/authenticate');
const authorizeMiddleware = require('../../middlewares/authorization');

const router = express.Router();

router.post('/addTableType', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), tableController.addTableType);
router.patch('/disableTableType', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([4]), tableController.disableTableType);
router.post('/addTable', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), tableController.addTable);
router.patch('/disableTable', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([4]), tableController.disableTable);

module.exports = router;
