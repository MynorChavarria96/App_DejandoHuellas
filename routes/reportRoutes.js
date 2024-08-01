const express = require('express');
const multer = require('multer');
const { addReport, getReports, showIndex, showEncontrados, showConsejos, showMisPerritos } = require('../controllers/reportController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Ruta raíz para renderizar index.ejs y obtener los reportes
router.get('/', showIndex);
router.get('/perdidos', getReports);
router.get('/encontrados', showEncontrados);
router.get('/consejos', showConsejos);
router.get('/mis-perritos', showMisPerritos);


// Ruta para manejar la subida de reportes
router.post('/addReport', upload.single('photo'), addReport);

module.exports = router;