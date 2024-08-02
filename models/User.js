const db = require('../db');

const User = {
  create: (userData, callback) => {
    const { username, password, firstName, lastName, address, phone } = userData;
    db.query(
      'INSERT INTO users (username, password, firstName, lastName, address, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, firstName, lastName, address, phone],
      callback
    );
  },
  findByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },
  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;