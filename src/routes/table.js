const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.post('/reserve', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.reserveTable);
router.get('/view-reservation', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.viewReservation);
router.delete('/cancel-reservation', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.cancelReservation);

module.exports = router;
