const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/fetch', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), menuController.fetch);
router.put('/update_availability', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), menuController.updateAvailability);

module.exports = router;
