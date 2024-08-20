const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Ruta para renderizar la vista
router.get('/:identificador_qr', reportController.infoQR);

// Ruta para hacer el fetch
router.get('/qr/:identificador_qr', reportController.mascotaQR);


module.exports = router;
