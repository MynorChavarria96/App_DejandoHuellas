const bcrypt = require('bcryptjs');
const passport = require('passport');
const fetch = require('node-fetch');

exports.showRegister = (req, res) => {
  res.render('register', { layout: false, errors: [] });
};

exports.showLogin = (req, res) => {
  res.render('login', { layout: false, errors: [] });
};

exports.register = async (req, res) => {
  const { username, password, firstName, lastName, address, phone } = req.body;
  let errors = [];

  if (!username || !password || !firstName || !lastName || !address || !phone) {
    errors.push('Por favor, completa todos los campos');
  }

  if (errors.length > 0) {
    return res.render('register', { layout: false, errors });
  }

  try {
    // Hashear la contraseña antes de enviarla a la API
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: hashedPassword, firstName, lastName, address, phone })
    });

    if (response.ok) {
      return res.redirect('/users/login');
    } else {
      const result = await response.json();
      errors.push(result.message || 'El usuario ya existe');
      return res.render('register', { layout: false, errors });
    }
  } catch (err) {
    errors.push('Error de conexión con la API');
    return res.render('register', { layout: false, errors });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  let errors = [];

  try {
    const response = await fetch(`http://localhost:5000/api/users/username/${username}`);
    if (!response.ok) {
      errors.push('Usuario no encontrado');
      return res.render('login', { layout: false, errors });
    }

    const user = await response.json();

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push('Contraseña incorrecta');
      return res.render('login', { layout: false, errors });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Almacenar el nombre del usuario en la sesión
      req.session.username = user.username;
      return res.redirect('/');
    });
  } catch (err) {
    errors.push('Error de conexión con la API');
    return res.render('login', { layout: false, errors });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
};