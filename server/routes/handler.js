const express = require('express');
const router = express.Router();
const { validateToken } = require('../utils/jwt.js')
require('dotenv').config();

const productController = require('../controllers/product.js')
const userController = require('../controllers/user.js')
const orderController = require('../controllers/order.js')
const invoiceController = require('../controllers/invoice.js')

router.get('/api/validation', validateToken, (req, res, next) => {
  console.log(res.locals.authUser)
  const auth = res.locals.authUser
  res.json({authUser: auth})
})

router.post('/api/register', userController.postUserRegister)

router.post('/api/login', userController.postUserLogin)

router.post('/api/userupdate/:userId', userController.postUserUpdatePass)    

router.post('/api/userdata/:userId', userController.postUserUpdateData);

router.post('/api/userdata-create/:userId', userController.postUserCreateData);

router.get('/api/billing/:userId', userController.getUserBilling);

router.get('/api/shipping/:userId', userController.getUserShipping);

router.get('/api/products', productController.getProducts);

router.get('/api/products/:productId', productController.getProduct);

router.get('/api/products_pricing', productController.getAllPricing);

router.get('/api/products_pricing/:productId', productController.getPricing);

router.get('/api/ratings', productController.getAllRatings);

router.get('/api/ratings/:productId', productController.getRating);

router.post('/api/create-order', orderController.postCreateOrder)

router.get('/api/orders/:userId', orderController.getOrders)

// admin area --------------------------------------------------------------------------

router.get('/api/admin/orders', orderController.getAdminOrders);

router.post('/api/admin/orders/update/:orderId', orderController.postUpdateOrder);

router.post('/api/admin/orders/mark/:orderId', orderController.postMarkOrder);

router.get('/api/admin/products/:productId', productController.getAdminProduct);

router.post('/api/admin/products/update-product/:productId', productController.postUpdateProduct);

router.post('/api/admin/products/add-product', productController.postAddProduct);

router.get('/api/admin/users', userController.getAdminUsers);

router.get('/api/admin/users/:userId', userController.getAdminUser);

// ngrok test -----------------------------------

router.post('/payu', orderController.postUpdatePayment)

// wFirma test ----------------------------------

router.get('/api/admin/wfirma', invoiceController.createInvoice)

module.exports = router;