const db = require('../utils/database');

module.exports = class User {
  constructor(id, email, password, timestamp) {
    this.id = id,
    this.email = email,
    this.password = password,
    this.timestamp = timestamp;
  }

  create() {
    return db.execute('INSERT INTO users (email, password, timestamp) VALUES (?,?,?)', [this.email, this.password, this.timestamp])
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE users.email = ?', [email])
  }

  update() {
    return db.execute('UPDATE users SET password = ? WHERE id = ?', [this.password, this.id])
  }

  static findAll() {
    return db.execute('SELECT id, email, timestamp, type FROM users')
  }

}