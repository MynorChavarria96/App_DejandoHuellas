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



//Importar Rutas
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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
    next();
  });

  // Rutas
  app.use('/', reportRoutes);
  app.use('/users', userRoutes);

  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.render('Inicio');
    } else {
      res.redirect('/users/login');
    }
  });
  
  // WebSockets
  require('./websocket')(wss);
  
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });