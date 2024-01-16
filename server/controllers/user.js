const bcrypt = require('bcrypt')
const { createTokens } = require('../utils/jwt.js')

const User = require('../models/User.js')
const BillingAddress = require('../models/BillingAddress.js')
const ShippingAddress = require('../models/ShippingAddress.js')

exports.postUserRegister = (req, res, next) => {
  console.log(req.body)
  const timestamp = Date.now()
  const id = null;
  const email = req.body.email;
  const password = req.body.password
  bcrypt.hash(password, 10)
    .then((hash) => {
      const user = new User(id, email, hash, timestamp)
      user.create()
        .then(() => {
          console.log('User created')
          res.json("User created")
        })
        .catch(err => {
          console.log(err)
          if (err) {
            res.status(400).json({ err: err });
          }
        })
    })
};

exports.postUserLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.find(email)
    .then(([user]) => {
      if (user.length === 0) {
        res.status(400).json({ err: "Podany użytkownik nie istnieje"})
      } else {
        bcrypt.compare(password, user[0].password)
          .then((match) => {
            if (!match) {
              res.status(400).json({ err: "Podane hasło jest nieprawidłowe"})
            } else {
              BillingAddress.find(user[0].id)
                .then(([billingAddress]) => {
                  ShippingAddress.find(user[0].id)
                    .then(([shippingAddress]) => {
                      if (billingAddress === undefined) {
                        billingAddress = {}
                        shippingAddress = {}
                      }
                      const authUser = {id: user[0].id, email: user[0].email, billingAddress: billingAddress[0], shippingAddress: shippingAddress[0] } 
                      const authToken = createTokens(authUser)
                      res.status(200).json({ auth: true, user: authUser, token:authToken, message: "Zalogowałeś się poprwanie!"})
                    })
                })
            }
          })
      }
    })
};

exports.postUserUpdatePass = (req, res, next) => {
  const userId = req.params.userId;
  const password = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const email = req.body.email
  User.find(email)
    .then(([user]) => {
      if (user.length === 0) {
        res.status(400).json({ err: "Podany użytkownik nie istnieje"})
      } else {
        bcrypt.compare(password, user[0].password)
          .then((match) => {
            if (!match) {
              res.json("Podane hasło jest nieprawidłowe")
            } else {
              bcrypt.hash(newPassword, 10)
              .then((hash) => {
                const user = new User(userId, email, hash)
                console.log(user)
                user.update()
                  .then(() => {
                    res.json("Hasło zostało zaktualziowane")
                  })
              })
            }
          })    
      }    
    })
};

exports.postUserUpdateData = (req, res, next) => {
  const userId = req.params.userId;
  console.log(req.body.dataSet)
  const d = req.body.dataSet
  const billingAddress = new BillingAddress(userId, d.name, d.surname, d.companyName, d.taxNumber, d.street, d.addressNumber1, d.addressNumber2, d.zipCode, d.city, d.country, d.phone)
  const shippingAddress = new ShippingAddress(userId, d.shippingName, d.shippingSurname, d.shippingCompanyName, d.shippingStreet, d.shippingAddressNumber1, d.shippingAddressNumber2, d.shippingZipCode, d.shippingCity, d.shippingCountry, d.shippingPhone)
  billingAddress.update()
    .then(() => {
      shippingAddress.update()
        .then(() => {
          res.json('Dane zostały zaktualziwoane')
        })
    })
    .catch(err => console.log(err))
};

exports.postUserCreateData = (req, res, next) => {
  const userId = req.params.userId;
  console.log(req.body.dataSet)
  const d = req.body.dataSet
  const billingAddress = new BillingAddress(userId, d.name, d.surname, d.companyName, d.taxNumber, d.street, d.addressNumber1, d.addressNumber2, d.zipCode, d.city, d.country, d.phone)
  const shippingAddress = new ShippingAddress(userId, d.shippingName, d.shippingSurname, d.shippingCompanyName, d.shippingStreet, d.shippingAddressNumber1, d.shippingAddressNumber2, d.shippingZipCode, d.shippingCity, d.shippingCountry, d.shippingPhone)
  billingAddress.save()
    .then(() => {
      shippingAddress.save()
        .then(() => {
          res.json('Dane zostały zaktualziwoane')
        })
    })
    .catch(err => console.log(err))
};

exports.getUserBilling = (req, res, next) => {
  const userId = req.params.userId;
  BillingAddress.find(userId)
    .then(([billingData]) => {
      res.end(JSON.stringify(billingData))
    })
    .catch(err => console.log(err))
};

exports.getUserShipping = (req, res, next) => {
  const userId = req.params.userId;
  ShippingAddress.find(userId)
    .then(([shippingData]) => {
      res.end(JSON.stringify(shippingData))
    })
    .catch(err => console.log(err))
};

exports.getAdminUsers = (req, res, next) => {
  User.findAll()
    .then(([rows]) => {
      res.end(JSON.stringify(rows));
    })
    .catch(err => console.log(err))
};

exports.getAdminUser = (req, res, next) => {
  const userId = req.params.userId;
  BillingAddress.find(userId)
  .then(([billingAddress]) => {
    ShippingAddress.find(userId)
      .then(([shippingAddress]) => {
        const userData = { billingAddress: billingAddress[0], shippingAddress: shippingAddress[0] } 
        res.status(200).json({userData})
      })
  })
};