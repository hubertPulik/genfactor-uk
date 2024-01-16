const Order = require('../models/Order.js')
const BillingAddress = require('../models/BillingAddress.js')
const ShippingAddress = require('../models/ShippingAddress.js')
const payment = require('../controllers/payment.js')

exports.postCreateOrder = (req, res, next) => {
  const timestamp = Date.now()
  const rBilling = req.body.order.userBillingData
  const rShipping = req.body.order.userShippingData
  const userId = req.body.order.userId;
  const billingData = JSON.stringify(rBilling);
  const shippingData = JSON.stringify(rShipping);
  const orderItems = JSON.stringify(req.body.order.orderItems);
  const orderValue = req.body.order.orderValue;
  const shippingMethod = req.body.order.shippingMethod;
  const shippingCost = req.body.order.shippingCost;
  const paymentMethod = 'blik';
  const orderInfo = req.body.order.orderInfo;
  const status = 'placed'
  const unread = 'true'
  const order = new Order(timestamp, userId, billingData, shippingData, orderItems, orderValue, shippingMethod, shippingCost, paymentMethod, orderInfo, status, unread)
  const billingAddress = new BillingAddress(userId, rBilling.name, rBilling.surname, rBilling.companyName, rBilling.taxNumber, rBilling.street, rBilling.addressNumber1, rBilling.addressNumber2, rBilling.zipCode, rBilling.city, rBilling.country, rBilling.phone)
  const shippingAddress = new ShippingAddress(userId, rShipping.name, rShipping.surname, rShipping.companyName, rShipping.street, rShipping.addressNumber1, rShipping.addressNumber2, rShipping.zipCode, rShipping.city, rShipping.country, rShipping.phone)

  const redirectPayment = (url) => {
    res.send(url)
  }

  const setToken = (token) => {
    payment.createPayment(req.body.order, token, redirectPayment)
  }

  payment.createToken(setToken)

  // BillingAddress.find(userId)
  //   .then(([address]) => {
  //     if (address.length === 0) {
  //       billingAddress.save()
  //       shippingAddress.save()
  //     } else {
  //       billingAddress.update()
  //       shippingAddress.update()
  //     }
  //   })

  // order.save()
  //   .then(([result]) => {
  //     res.json({'Status': 'OK', 'orderId': result.insertId})
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     if (err) {
  //       res.status(400).json({ err: err });
  //     }
  //   })
};

exports.getOrders = (req, res, next) => {
  const userId = req.params.userId;
  Order.find(userId)
  .then(([orders]) => {
    res.end(JSON.stringify(orders))
  })
  .catch(err => console.log(err))
};

exports.getAdminOrders = (req, res, next) => {
  Order.findAll()
    .then(([rows]) => {
      res.end(JSON.stringify(rows));
    })
    .catch(err => console.log(err))
}

exports.postMarkOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  const unread = 'false'
  Order.markRead(unread, orderId)
    .then(() => {
      console.log('Order marked as read')
      res.send('Order marked as read')
    })
    .catch(err => console.log(err))
};

exports.postUpdateOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  const status = req.body.status
  Order.updateStatus(status, orderId)
    .then(() => {
      console.log('Order status update')
      res.send('Order status update')
    })
    .catch(err => console.log(err))
};

exports.postUpdatePayment = (req, res, next) => {
  console.log('payU end')
  console.log(req.body)
}