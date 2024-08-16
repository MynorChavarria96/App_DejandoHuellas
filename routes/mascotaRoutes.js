
const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/especies', mascotaController.obtenerEspecies);
router.get('/generos', mascotaController.obtenerGeneros);

router.get('/mis-mascotas', mascotaController.misMascotas);

// Ruta para procesar el formulario de registro de mascota
router.post('/registrar', mascotaController.registrarMascota);
router.put('/actualizar/:mascota_id', mascotaController.actualizarMascota);
router.put('/eliminar/:mascota_id', mascotaController.eliminarMascota);
module.exports = router;