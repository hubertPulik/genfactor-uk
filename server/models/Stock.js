const db = require('../utils/database')

module.exports = class Stock {
  constructor(id, stock) {
    this.id = id;
    this.stock = stock;
  }

  save() {
    return db.execute('INSERT INTO products_stock (prodId, stock) VALUES (?,?)', [this.id, this.stock])
  }

};