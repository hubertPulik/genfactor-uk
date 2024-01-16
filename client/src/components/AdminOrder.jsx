import { useState, useEffect } from "react";

export default function AdminOrder({order, viewOrder, markRead, statusChange}) {

  const [ orderDate, setOrderDate ] = useState(new Date(order.timestamp))
  const [ billingData, setBillingData ] = useState((JSON.parse(order.billingData)))
  const [ shippingData, setShippingData ] = useState((JSON.parse(order.shippingData)))
  const [ orderItems, setOrderItems ] = useState((JSON.parse(order.orderItems)))
  const [ orderStatus, setOrderStatus ] = useState(order.status)

  useEffect(() => {
    if (order.unread === 'true') {
      console.log(order.unread)
      markRead(order.id)
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    statusChange(order.id, orderStatus)
    order = {...order, status: orderStatus}
  }
 
  return (
    <div className="adminOrdersSingle">
      {!order && !order.id ? <div>Ladowanie...</div> :
      <div>
        <h3>Zamówienie numer: #{order.id}</h3>
        <p>Złożone: {orderDate.toLocaleDateString('ISO', { day:"numeric",  month:"short", year:"numeric"})} o {orderDate.getHours()}:{orderDate.getMinutes()}</p>
        <div className="fieldBox">
          <form className="statusChange">
            <label htmlFor="status">Status: </label>
            <select className={`${orderStatus}`} type="select" id="status" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
              <option className="placed" value="placed">Złożone</option>
              <option className="payed" value="payed">Opłacone</option>
              <option className="hold" value="hold">Oczekujące</option>
              <option className="finished" value="finished">Zakończone</option>
              <option className="canceled" value="canceled">Anulowane</option>
            </select>
            <button type="submit" onClick={(e) => submit(e)}>Zmień status</button>
          </form>
        </div>
        <br />
        <p>Zamawiający: {billingData.name} {billingData.surname}, {billingData.email}</p>
        <div className="clientData">
          <div className="clientData__data">
            <p className="clientData__heading">Adres rozliczeniowy</p>
            <p className="clientData__h">Imię i nazwsiko:</p>
            <p className="clientData__value">{billingData.name} {billingData.surname}</p>
            {!billingData.companyName ? <></> : <p className="clientData__h">Firma</p>}
            <p className="clientData__value">{billingData.companyName}</p>
            {!billingData.companyName ? <></> : <p className="clientData__h">Numer NIP</p>}
            <p className="clientData__value">{billingData.taxNumber}</p>
            <p className="clientData__h">Adres</p>
            <p className="clientData__value">{billingData.street} {billingData.addressNumber1} / {billingData.addressNumber2}</p>
            <p className="clientData__value">{billingData.zipCode} {billingData.city}</p>
            <p className="clientData__value">{billingData.country}</p>
            <p className="clientData__h">Telefon</p>
            <p className="clientData__value">{billingData.phone}</p>
          </div>
          <div className="clientData__data">
            <p className="clientData__heading">Adres dostawy</p>
            <p className="clientData__h">Imię i nazwsiko:</p>
            <p className="clientData__value">{billingData.name} {billingData.surname}</p>
            {!shippingData.companyName ? <></> : <p className="clientData__h">Firma</p>}
            <p className="clientData__value">{billingData.companyName}</p>
            <p className="clientData__h">Adres</p>
            <p className="clientData__value">{billingData.street} {billingData.addressNumber1} / {billingData.addressNumber2}</p>
            <p className="clientData__value">{billingData.zipCode} {billingData.city}</p>
            <p className="clientData__value">{billingData.country}</p>
            <p className="clientData__h">Telefon</p>
            <p className="clientData__value">{billingData.phone}</p>
          </div>
        </div>
        <h3 className="marginTop">Szczegóły zamówienia</h3>
        {orderItems.map(item => (
          <div className="adminOrdersItem_row" key={item.name}>
            <div className="a-name">{item.name}</div>
            <div className="a-quantity">szt. {item.quantity}</div>
            <div className="a-value">{Math.round(item.netto * item.vat * item.quantity * 100)/100}</div>
          </div>
        ))}
        <div className="adminOrdersItem_row">
          <div className="a-name">Dostawa</div>
          <div className="a-quantity">{order.shippingMethod}</div>
          <div className="a-value">{order.shippingCost}</div>
        </div>
        <div className="adminOrdersItem_row__total">
          <div>Razem</div>
          <div>{Math.round(order.orderValue*100)/100}</div>
        </div>
      </div>}
    <button className="btn marginTop" onClick={() => viewOrder(null, false)}>
      Wróć do listy zamówień
    </button>
    </div>
  )
}
