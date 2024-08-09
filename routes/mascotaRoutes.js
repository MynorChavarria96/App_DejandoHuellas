
const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/especies', mascotaController.obtenerEspecies);
router.get('/generos', mascotaController.obtenerGeneros);

// Ruta para procesar el formulario de registro de mascota
router.post('/registrar', mascotaController.registrarMascota);
module.exports = router;