const db = require('../utils/database');

module.exports = class Product {
  constructor(name, ref_number, category, description, weight, dimensions, main_img, img_gallery) {
    this.name = name;
    this.ref_number = ref_number;
    this.category = category;
    this.description = description;
    this.weight = weight;
    this.dimensions = dimensions;
    this.main_img = main_img;
    this.img_gallery = img_gallery
  };

  save() {
   return db.execute('INSERT INTO products (name, ref_number, category, description, weight, dimensions, main_img, img_gallery) VALUES (?,?,?,?,?,?,?,?)', [this.name, this.ref_number, this.category, this.description, this.weight, this.dimensions, this.main_img, this.img_gallery])
  };

  static fetchAll() {
   return db.execute('SELECT products.id, name, ref_number, category, description, main_img, netto, vat, rating, stock FROM products JOIN products_pricing ON products.id = products_pricing.id JOIN ratings ON products.id = ratings.id JOIN products_stock ON products.id = products_stock.prodId;');
  };

  static findById(id) {
    return db.execute('SELECT products.id, name, ref_number, category, description, main_img, netto, vat, rating, stock FROM products JOIN products_pricing ON products.id = products_pricing.id JOIN ratings ON products.id = ratings.id JOIN products_stock ON products.id = products_stock.prodId WHERE products.id = ?;', [id])
  };

  static updateProduct(product, id) {
    return db.execute('UPDATE products SET name = ?, ref_number = ?, category = ?, description = ?, main_img = ? WHERE id = ?', [product.name, product.ref_number, product.category, product.description, product.main_img, id])
  }

  static updatePricing(product, id) {
    return db.execute('UPDATE products_pricing SET netto = ?, vat = ? WHERE id = ?', [product.netto, product.vat, id])
  }

  static updateStock(product, id) {
    return db.execute('UPDATE products_stock SET stock = ? WHERE prodId = ?', [product.stock, id])
  }

};