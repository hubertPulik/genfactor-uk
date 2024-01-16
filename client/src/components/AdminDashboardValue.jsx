import { useState, useEffect } from "react"

export default function AdminDashboardValue({ orders, isPennding }) {

  const [ ordersValue, setOrdersValue ] = useState()
  const [ newOrdersValue, setNewOrdersValue ] = useState()

  useEffect(() => {
    let value = 0
    orders.forEach(order => {
      value = value + order.orderValue
    });
    let newValue = 0
    const newOrders = orders.filter(order => {
      return order.unread === 'true'
    })
    newOrders.forEach(order => {
      newValue = newValue + order.orderValue
    });
    setOrdersValue(Math.round(value * 100) / 100)
    setNewOrdersValue(Math.round(newValue * 100) / 100)
  }, [orders, isPennding])

  return (
    <>
    {isPennding ? <></> :
       <div className='adminDashboard__value'>
        <div className="adminDashboard__valueInner">
          <h3>Wartość zamówień</h3>
          <h1>{ordersValue}</h1>
        </div>
        <div  className="adminDashboard__valueInner">
          <h4>Wartość nowych zamówień</h4>
          <h2>{newOrdersValue}</h2>
        </div>
     </div>
    }
    </>
  )
}
