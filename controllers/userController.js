const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password, firstName, lastName, address, phone } = req.body;
  let errors = [];

  if (!username || !password || !firstName || !lastName || !address || !phone) {
    errors.push({ msg: 'Por favor, completa todos los campos' });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    User.findByUsername(username, (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        errors.push({ msg: 'El usuario ya está registrado' });
        res.render('register', { errors });
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
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/users/login');
  });
};