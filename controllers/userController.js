const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.showRegister = (req, res) => {
  res.render('register', { layout: false, errors: [] });
};

exports.showLogin = (req, res) => {
  res.render('login', { layout: false, errors: [] });
};

exports.register = (req, res) => {
  const { username, password, firstName, lastName, address, phone } = req.body;
  let errors = [];

  if (!username || !password || !firstName || !lastName || !address || !phone) {
    errors.push('Por favor, completa todos los campos');
  }

  if (errors.length > 0) {
    res.render('register', { layout: false, errors });
  } else {
    User.findByUsername(username, (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        errors.push('El usuario ya está registrado');
        res.render('register', { layout: false, errors });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const newUser = { username, password: hash, firstName, lastName, address, phone };
            User.create(newUser, (err, result) => {
              if (err) throw err;
              res.redirect('/users/login');
            });
          });
        });
      }
    });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render('login', { layout: false, errors: ['Credenciales incorrectas'] });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

       // Almacenar el nombre del usuario en la sesión
       req.session.username = user.username;
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
};