
const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/especies', mascotaController.obtenerEspecies);
router.get('/generos', mascotaController.obtenerGeneros);

module.exports = router;