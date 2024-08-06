const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/username/${username}`);
      if (!response.ok) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const user = await response.json();

      const isMatch = await bcrypt.compare(password, user.contraseña);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => done(null, user.usuario_id));

  passport.deserializeUser(async (id, done) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/id/${id}`);
      if (!response.ok) {
        return done(new Error('Usuario no encontrado'));
      }

      const user = await response.json();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initialize;