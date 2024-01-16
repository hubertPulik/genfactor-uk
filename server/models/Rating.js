const db = require('../utils/database')

module.exports = class Rating {
  constructor(id, rating) {
    this.id = id;
    this.rating = rating;
  }

  save() {
    return db.execute('INSERT INTO ratings (id, rating) VALUES (?,?)', [this.id, this.rating])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM ratings');
  }

  static findById(id) {
    return db.execute('SELECT * FROM ratings WHERE id =?', [id])
  };

};