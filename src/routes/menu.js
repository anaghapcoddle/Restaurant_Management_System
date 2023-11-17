const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/view', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), menuController.view);
router.put('/updateAvailability', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), menuController.updateAvailability);

module.exports = router;
