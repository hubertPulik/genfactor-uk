const db = require('../utils/database');

module.exports = class Order {
  constructor(timestamp, userId, billingData, shippingData, orderItems, orderValue, shippingMethod, shippingCost, paymentMethod, orderInfo, status, unread) {
    this.timestamp = timestamp;
    this.userId = userId;
    this.billingData = billingData;
    this.shippingData = shippingData;
    this.orderItems = orderItems;
    this.orderValue = orderValue;
    this.shippingMethod = shippingMethod;
    this.shippingCost = shippingCost;
    this.paymentMethod = paymentMethod;
    this.orderInfo = orderInfo;
    this.status = status
    this.unread = unread
  }

  save() {
    return db.execute('INSERT INTO orders (timestamp, userId, billingData, shippingData, orderItems, orderValue, shippingMethod, shippingCost, paymentMethod, orderInfo, status, unread) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [this.timestamp, this.userId, this.billingData, this.shippingData, this.orderItems, this.orderValue, this.shippingMethod, this.shippingCost, this.paymentMethod, this.orderInfo, this.status, this.unread])
  }

  static find(userId) {
    return db.execute('SELECT id, timestamp, orderValue, shippingCost, status FROM orders WHERE userId = ?', [userId])
  }

  static findAll() {
    return db.execute('SELECT * FROM orders')
  }

  static updateStatus(status, id) {
    return db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id])
  }

  static markRead(unread, id) {
    return db.execute('UPDATE orders SET unread = ? WHERE id = ?', [unread, id])
  }


}