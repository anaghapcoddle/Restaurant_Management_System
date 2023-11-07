const express = require('express');
const tableController = require('../controllers/table');
const authMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.post('/reserve', authMiddleware.verifyToken, tableController.reserveTable);
router.get('/view-reservation', authMiddleware.verifyToken, tableController.viewReservation);
router.delete('/cancel-reservation', authMiddleware.verifyToken, tableController.cancelReservation);

module.exports = router;
