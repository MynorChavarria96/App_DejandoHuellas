const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

exports.showRegister = (req, res) => {
  res.render('register', { layout: false, errors: [], success: req.session.success });
  delete req.session.success;
};

exports.showLogin = (req, res) => {
  res.render('login', { layout: false, errors: [] });
};

exports.register = async (req, res) => {
  const { nombre_usuario, email, contraseña, nombres, apellidos, direccion, telefono } = req.body;

  if (!nombre_usuario || !email || !contraseña || !nombres || !apellidos || !direccion || !telefono) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const response = await fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_usuario, email, contraseña: hashedPassword, nombres, apellidos, direccion, telefono })
    });

    const result = await response.json();

    if (response.ok) {
      req.session.success = 'Registro exitoso. Por favor, inicia sesión.';
      return res.status(200).json({ message: 'Registro exitoso' });
    } else {
      return res.status(400).json({ message: result.error });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error de conexión con la API' });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos' });
  }

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/username/${username}`);
    if (!response.ok) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = await response.json();
    const isMatch = await bcrypt.compare(password, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      req.session.username = user.nombre_usuario;
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error de conexión con la API' });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
};
