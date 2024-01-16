export const sortOrdersId = (orders, direction) => {
  if (direction === 'descending') {
    let outputState = orders.sort((x, y) => {
      return y.id - x.id
    })
    return outputState
  } else if (direction === 'ascending') {
    let outputState = orders.sort((x, y) => {
      return x.id - y.id
    })
    return outputState
  }
}

export const sortOrdersEmail = (orders, direction) => {
  if (direction === 'descending') {
    let outputState = orders.sort((x, y) => {
      let a = (JSON.parse(x.billingData)).email.toUpperCase(),
      b = (JSON.parse(y.billingData)).email.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    })
    return outputState
  } else if (direction === 'ascending') {
    let outputState = orders.sort((x, y) => {
      let a = (JSON.parse(x.billingData)).email.toUpperCase(),
      b = (JSON.parse(y.billingData)).email.toUpperCase();
      return a === b ? 0 : a < b ? 1 : -1;
    })
    return outputState
  }
}

export const sortOrdersValue = (orders, direction) => {
  if (direction === 'descending') {
    let outputState = orders.sort((x, y) => {
      return y.orderValue - x.orderValue
    })
    return outputState
  } else if (direction === 'ascending') {
    let outputState = orders.sort((x, y) => {
      return x.orderValue - y.orderValue
    })
    return outputState
  }
}

export const sortOrdersDate = (orders, direction) => {
  if (direction === 'descending') {
    let outputState = orders.sort((x, y) => {
      return y.timestamp - x.timestamp
    })
    return outputState
  } else if (direction === 'ascending') {
    let outputState = orders.sort((x, y) => {
      return x.timestamp - y.timestamp
    })
    return outputState
  }
}

export const sortOrdersStatus = (orders, direction) => {
  if (direction === 'descending') {
    let outputState = orders.sort((x, y) => {
      let a = x.status.toUpperCase(),
      b = y.status.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    })
    return outputState
  } else if (direction === 'ascending') {
    let outputState = orders.sort((x, y) => {
      let a = x.status.toUpperCase(),
      b = y.status.toUpperCase();
      return a === b ? 0 : a < b ? 1 : -1;
    })
    return outputState
  }
}