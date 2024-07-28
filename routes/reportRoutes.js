const express = require('express');
const multer = require('multer');
const path = require('path');
const { addReport, getReports } = require('../controllers/reportController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Ruta raíz para renderizar index.ejs
router.get('/', getReports);

// Ruta para manejar la subida de reportes
router.post('/addReport', upload.single('photo'), addReport);

module.exports = router;