const axios = require('axios');
require('dotenv').config();

exports.createPayment = (orderData, token, redirectPayment) => {
  console.log('orderdata:')
  console.log(orderData)
  const o = orderData
  const products = []
  o.orderItems.map(item => {
    const unitPrice = Math.round(item.netto * item.vat * 100)
    products.push({name: item.name, unitPrice: (unitPrice.toString()), quantity: (item.quantity.toString())})
  })
  axios.post(
    'https://secure.snd.payu.com/api/v2_1/orders',
    {
      'notifyUrl': 'https://fb10-185-231-12-126.ngrok-free.app/payu',
      'customerIp': '127.0.0.1',
      'merchantPosId': `${process.env.PAYU_POSID}`,
      'description': 'Online Shop',
      'currencyCode': 'PLN',
      'totalAmount': (o.orderValue * 100).toString(),
      'buyer': {
        'email': o.userBillingData.email,
        'phone': o.userBillingData.phone,
        'firstName': o.userBillingData.name,
        'lastName': o.userBillingData.surname,
        'language': o.userBillingData.country
      },
      'products': [...products]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  )
  .then((res) => {
    redirectPayment(res.request._redirectable._currentUrl)
  })
}

exports.createToken = (setToken) => {
  axios.post('https://secure.snd.payu.com/pl/standard/user/oauth/authorize',
  new URLSearchParams({
    'grant_type': 'client_credentials',
    'client_id': `${process.env.PAYU_POSID}`,
    'client_secret': `${process.env.PAYU_SECRET}`
  })
  )
  .then(res => {
    setToken(res.data.access_token)
  })
}