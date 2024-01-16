const Product = require('../models/Product.js');
const Price = require('../models/Price.js');
const Rating = require('../models/Rating.js');
const Stock = require('../models/Stock.js');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.end(JSON.stringify(rows));
    })
    .catch(err => console.log(err))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.end(JSON.stringify(product))
    })
    .catch(err => console.log(err))
};

exports.getAllPricing = (req, res, next) => {
  Price.fetchAll()
    .then(([rows, fieldData]) => {
      res.end(JSON.stringify(rows));
    })
    .catch(err => console.log(err))
};

exports.getPricing = (req, res, next) => {
  const prodId = req.params.productId;
  Price.findById(prodId)
    .then(([pricing]) => {
      res.end(JSON.stringify(pricing))
    })
    .catch(err => console.log(err))
};

exports.getAllRatings = (req, res, next) => {
  let ratings = []
  Rating.fetchAll()
    .then(([ratings]) => {
      res.end(JSON.stringify(ratings))
    })
    .catch(err => console.log(err))
};

exports.getRating = (req, res, next) => {
  const prodId = req.params.productId;
  Rating.findById(prodId)
    .then(([rating]) => {
      res.end(JSON.stringify(rating))
    })
    .catch(err => console.log(err))
};

exports.getAdminProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.end(JSON.stringify(product))
    })
    .catch(err => console.log(err))
};

exports.postAddProduct = (req, res, next) => {
  const prod = req.body.updatedObject
  console.log(prod)
  const name = prod.name
  const category = prod.category
  const ref_number = prod.ref_number
  const description = prod.description
  const main_img = prod.main_img
  const dimensions = prod.dimensions
  const weight = prod.weight
  const img_gallery = prod.img_gallery
  const netto = prod.netto
  const netto_margin = prod.netto_margin
  const vat = prod.vat
  const stock = prod.stock
  const rating = prod.rating
  const product = new Product(name, ref_number, category, description, weight, dimensions, main_img, img_gallery)
  product.save()
    .then(([result]) => {
      const id = result.insertId
      const pricing = new Price(id, netto, netto_margin, vat)
      pricing.save()
      const productStock = new Stock(id, stock)
      productStock.save()
      const productRating = new Rating(id, rating)
      productRating.save()
      res.json({'Status': 'Produkt dodany', 'productId': id})
    })     
    .catch(err => console.log(err))
};

exports.postUpdateProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const prod = req.body.updatedObject
  console.log(prodId)
  console.log(prod)
  Product.updateProduct(prod, prodId)
    .then(() => {
      Product.updatePricing(prod, prodId)
      .then(() => {
        Product.updateStock(prod, prodId)
        console.log('produkt zaktualizowany')
        res.send('Produkt zaktualizowany')
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
};