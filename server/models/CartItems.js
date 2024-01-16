const db = require('../utils/database');

module.exports = class CartItem {
  constructor(itemId, cartId, productId, quantity) {
    this.itemId = itemId;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
  }

  save() {
    return db.execute('INSERT INTO cart_items (cartId, productId, quantity) VALUES (?, ?, ?)', [this.cartId, this.productId, this.quantity])
  };

  update() {
    return db.execute('UPDATE cart_items SET quantity = ? WHERE itemId = ? AND cartId = ? AND productId = ?', [this.quantity, this.itemId, this.cartId, this.productId])
  };
};