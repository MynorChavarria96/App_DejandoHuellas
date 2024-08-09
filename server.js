require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passportConfig');
const multer = require('multer');

// Importar rutas
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const { ensureAuthenticated } = require('./middleware/auth');

// Configurar Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Configurar sesión
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Inicializar Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware para pasar el nombre del usuario a las vistas
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.userId = req.session.userId || null;
  res.locals.propietarioId = req.session.propietarioId || null;
  next();
});

// Ruta para cargar la imagen
app.post('/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Rutas
app.use('/mascotas', mascotaRoutes);
app.use('/users', userRoutes);
app.use('/', ensureAuthenticated, reportRoutes);

// Ruta raíz para manejar redirección basada en autenticación
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/'); // Redirigir a una página autenticada, por ejemplo, el dashboard
  } else {
    res.redirect('/users/login');
  }
});

// Ruta protegida de ejemplo
app.get('/', ensureAuthenticated, (req, res) => {
  res.render('index'); // Asegúrate de tener una vista 'home.ejs'
});

// WebSockets
require('./websocket')(wss);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});