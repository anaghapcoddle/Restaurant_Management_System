const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.post('/reserve', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.reserveTable);
router.get('/viewReservation', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.viewReservation);
router.patch('/updateReservationStatus', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.updateReservationStatus);
router.delete('/cancelReservation', authMiddleware.verifyToken, authorizeMiddleware.authorizePage(['admin', 'user']), tableController.cancelReservation);

module.exports = router;
