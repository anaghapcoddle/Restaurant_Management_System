const express = require('express');
const menuController = require('../controllers/menu');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/fetch', authMiddleware.verifyToken, menuController.fetch);
router.put('/update_availability', authMiddleware.verifyToken, menuController.updateAvailability);

module.exports = router;
