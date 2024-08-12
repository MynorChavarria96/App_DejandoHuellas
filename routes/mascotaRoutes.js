
const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/especies', mascotaController.obtenerEspecies);
router.get('/generos', mascotaController.obtenerGeneros);

router.get('/mias-mascotas', mascotaController.misMascotas);

// Ruta para procesar el formulario de registro de mascota
router.post('/registrar', mascotaController.registrarMascota);
module.exports = router;