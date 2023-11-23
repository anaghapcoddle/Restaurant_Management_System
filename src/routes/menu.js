const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/view', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([1]), menuController.view);
router.patch('/updateAvailability', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([3]), menuController.updateAvailability);

module.exports = router;
