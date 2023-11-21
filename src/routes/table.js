const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../middlewares/authenticate');
const authorizeMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.post('/reserve', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([2]), tableController.reserveTable);
router.get('/viewReservation', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([1]), tableController.viewReservation);
router.patch('/updateReservationStatus', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([3]), tableController.updateReservationStatus);
router.delete('/cancelReservation', authMiddleware.verifyToken, authorizeMiddleware.authorizePage([4]), tableController.cancelReservation);

module.exports = router;
