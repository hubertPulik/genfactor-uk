const db = require('../utils/database');

module.exports = class BillingAddress {
  constructor(userId, name, surname, companyName, taxNumber, street, addressNumber1, addressNumber2, zipCode, city, country, phone) {
    this.userId = userId,
    this.name = name,
    this.surname = surname,
    this.companyName = companyName,
    this.taxNumber = taxNumber,
    this.street = street,
    this.addressNumber1 = addressNumber1,
    this.addressNumber2 = addressNumber2,
    this.zipCode = zipCode,
    this.city = city,
    this.country = country,
    this.phone = phone
  }

  save() {
    return db.execute('INSERT INTO user_billing (userId, name, surname, companyName, taxNumber, street, addressNumber1, addressNumber2, zipCode, city, country, phone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [this.userId, this.name, this.surname, this.companyName, this.taxNumber, this.street, this.addressNumber1, this.addressNumber2, this.zipCode, this.city, this.country, this.phone])
  }

  update() {
    return db.execute('UPDATE user_billing SET name = ?, surname = ?, companyName = ?, taxNumber = ?, street = ?, addressNumber1 = ?, addressNumber2 = ?, zipCode = ?, city = ?, country = ?, phone = ? WHERE userId = ?', [this.name, this.surname, this.companyName, this.taxNumber, this.street, this.addressNumber1, this.addressNumber2, this.zipCode, this.city, this.country, this.phone, this.userId])
  }

  static find(userId) {
    return db.execute('SELECT * FROM user_billing WHERE userId = ?', [userId])
  }

}