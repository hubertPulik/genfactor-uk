const db = require('../utils/database');

module.exports = class Cart {
  constructor(id, userId) {
    this.id = id;
    this.userId = userId;
  }

  save() {
   
  }

  static getCart(userId) {
    return db.execute('SELECT cart_items.itemId, carts.id, cart_items.productId, cart_items.quantity, products.name, products.main_img, products_pricing.netto, products_pricing.vat FROM carts JOIN cart_items ON carts.id = cart_items.cartId LEFT JOIN products ON cart_items.productId = products.id LEFT JOIN products_pricing ON cart_items.productId = products_pricing.id WHERE carts.userId = ?', [userId])
  }

};

