const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta de registro
router.get('/register', (req, res) => res.render('register'));
router.post('/register', userController.register);

// Ruta de inicio de sesión
router.get('/login', (req, res) => res.render('login'));
router.post('/login', userController.login);

// Ruta de cierre de sesión
router.get('/logout', userController.logout);

module.exports = router;