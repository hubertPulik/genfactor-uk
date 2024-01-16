import { useState, useEffect } from "react"
import Axios from 'axios'

export default function MyAccountOrders({ user }) {

  const [ orders, setOrders ] = useState([])
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr] = useState(null)

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/orders/${user.id}`)
      .then(res => {
        setOrders(res.data);
        setIsPennding(false);
        setErr(null);
      })
      .catch(err => {
        console.log(err)
        setIsPennding(false);
        setErr(err.message);
      })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [user])

  return (
    <div className="myaccount__orders">
      <div className="table__row">
        <div className="table__col1"><strong>Numer zamówienia</strong></div><div className="table__col2"><strong>Data złożenia</strong></div><div className="table__col3"><strong>Wartość</strong></div><div className="table__col4"><strong>Status</strong></div>
      </div>
      {err ? <>{err}</> : <></>}
      {!isPennding ? orders.map(order => {
      const orderDate = new Date(order.timestamp)
      const orderDateString = orderDate.toDateString()
      return (
        <div className="table__row" key={order.id}>
          <div className="table__col1">{order.id}</div><div className="table__col2">{orderDateString}</div><div className="table__col3 table__price">{order.orderValue + order.shippingCost}</div><div className="table__col4">{order.status}</div>
        </div>
      )}) : <></>}
    </div>
  )
}
