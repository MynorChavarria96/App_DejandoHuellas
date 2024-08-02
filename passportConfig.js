const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Importar el modelo de usuario

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    User.findByUsername(username, (err, results) => {
      if (err) return done(err);
      if (results.length === 0) return done(null, false, { message: 'Usuario no encontrado' });

      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
      });
    });
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, results) => {
      if (err) return done(err);
      return done(null, results[0]);
    });
  });
}

module.exports = initialize;