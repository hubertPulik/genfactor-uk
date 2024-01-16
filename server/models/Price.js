const db = require('../utils/database')

module.exports = class Price {
  constructor(id, netto, netto_margin, vat) {
    this.id = id;
    this.netto = netto;
    this.netto_margin = netto_margin;
    this.vat = vat;
  }

  save() {
    return db.execute('INSERT INTO products_pricing (id, netto, netto_margin, vat) VALUES (?,?,?,?)', [this.id, this.netto, this.netto_margin, this.vat])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products_pricing');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products_pricing WHERE id =?', [id])
  };

};