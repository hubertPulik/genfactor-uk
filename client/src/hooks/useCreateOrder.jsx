// export const createOrder = (billingData, shippingData, orderInfo) => {
//   const order = {
//     userId: user.id,
//     userBillingData: billingData,
//     userShippingData: shippingData,
//     differentShipping: differentShipping,
//     orderItems: user.userCart,
//     orderValue: orderValue,
//     shippingMethod: shippingMethod,
//     shippingCost: shippingCost,
//     userIsCompany: isCompany,
//     paymentMethod: '',
//     orderInfo: orderInfo
//   }
//   console.log(order)
//   Axios.post('http://localhost:3001/api/create-order', {
//     order
//   }).then((response) => {
//     console.log(response)
//   }).catch((err) => {
//     console.log(err)
//   })
// }