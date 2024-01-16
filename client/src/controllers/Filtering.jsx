export const filterAction = (orders, searchTerm) => {
  return orders.filter(order => {
    return order.id.toString().includes(searchTerm) ||
    (JSON.parse(order.billingData)).email.toLowerCase().includes(searchTerm) ||
    (JSON.parse(order.billingData)).name.toLowerCase().includes(searchTerm) ||
    (JSON.parse(order.billingData)).surname.toLowerCase().includes(searchTerm) ||
    order.status === searchTerm
  })
}

export const filterDateAction = (orders, fromDate, toDate) => {
  return orders.filter(order => {
    const from = new Date(fromDate)
    const to = new Date(toDate)
    if (from !== undefined) {
      if (to !== undefined) {
        return order.timestamp >= from && order.timestamp <= to
      } else {
        return order.timestamp >= from
      }
    } else if (to !== undefined) {
      return order.timestamp <= to
    }
    return orders
  })
}