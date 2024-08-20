// const express = require('express');
// const multer = require('multer');
// //const { ensureAuthenticated } = require('../middleware/auth');
// const { addReport, getReports, showIndex, showEncontrados, showConsejos, showMisMascotas, showDetalles } = require('../controllers/reportController');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// // Ruta raíz para renderizar index.ejs y obtener los reportes
// // router.get('/', ensureAuthenticated, showIndex);
// // router.get('/perdidos', ensureAuthenticated, getReports);
// // router.get('/encontrados', ensureAuthenticated, showEncontrados);
// // router.get('/consejos', ensureAuthenticated, showConsejos);
// // router.get('/mis-mascotas', ensureAuthenticated, showMisMascotas);
// // router.get('/mis-mascotas/detalles/:id', ensureAuthenticated, showDetalles);


// // Ruta para manejar la subida de reportes
// router.post('/addReport', upload.single('photo'), ensureAuthenticated, addReport);

// module.exports = router;