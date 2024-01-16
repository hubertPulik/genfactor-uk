import { useState, useEffect } from "react"

export default function AdminDashboardOrders({ orders, isPennding }) {

  const [ newOrders, setNewOrders ] = useState()
  const [ ordersSatus, setOrdersStatus ] = useState([])

  useEffect(() => {
    const o = (orders.filter(order => {
      return order.unread === "true"
    }).slice(0, 4))
    setNewOrders(o)
  }, [orders, isPennding])

  useEffect(() => {
    const placed = orders.filter(order => {
      return order.status === 'placed'
    })
    const payed = orders.filter(order => {
      return order.status === 'payed'
    })
    const hold = orders.filter(order => {
      return order.status === 'hold'
    })
    const finished = orders.filter(order => {
      return order.status === 'finished'
    })
    const canceled = orders.filter(order => {
      return order.status === 'canceled'
    })
    const status = [
      {status: 'Złożone', count: placed.length + 1},
      {status: 'Opłacone',count: payed.length + 1},
      {status: 'Oczekujące', count: hold.length + 1},
      {status: 'Zakończone', count: finished.length + 1},
      {status: 'Anulowane', count: canceled.length + 1},
    ]
    setOrdersStatus(status)
  }, [orders, isPennding])

  return (
    <>
    {isPennding ? <></> :
      <div className='adminDashboard__orders'>
      <div className="adminDashboard__newOrders">
        <h3>Najnowsze zamówienia</h3>
        {newOrders && newOrders.map(order => {
          const orderDate = new Date(order.timestamp)
          const orderDateString = orderDate.toLocaleDateString('ISO', { day:"numeric",  month:"short", year:"numeric" })
          return (
          <div className='adminDashboard__order' key={order.id}>
            <div className="id">{order.id}</div>
            <div className="date">{orderDateString}</div>
            <div className="value">{Math.round(order.orderValue * 100) / 100}</div>
          </div>
        )})}
      </div>
      <div className="adminDashboard__status">
        <h3>Zamówienia według statusu</h3>
        <div className="adminDashboard__statusInner">
          {ordersSatus.map(status => (
              <div className="adminDashboard__statusBox" key={status.status}>
                <p className={status.status}>{status.status}</p>
                <h2 className={status.status}>{status.count}</h2>
              </div>
          ))}
        </div>
      </div>
    </div>
    }
    </>
    
  )
}
