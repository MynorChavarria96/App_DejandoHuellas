require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const path = require('path');
const reportRoutes = require('./routes/reportRoutes');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio "public"
app.use('/public', express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde el directorio "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Rutas
app.use('/', reportRoutes);


// WebSockets
require('./websocket')(wss);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});