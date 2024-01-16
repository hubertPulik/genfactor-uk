import { useState } from 'react'

export default function AdminOrdersTable({ filteredOrders, isPennding, err, setSearchValue, searchValue, setFromDate, setToDate, sortAction, viewOrder}) {

  const [ statusSearch ] = useState(searchValue)

  return (
    <div className="adminOrders">
      <div className="adminOrders__row adminOrders__searchbar">
        <div className="fieldBox">
          <label htmlFor="search">Szukaj:</label>
          <input type="text" id="search" onChange={(e) => {setSearchValue(e.target.value)}}/>
        </div>
        <div className="fieldBox">
          <div className="fieldBox">
            <label htmlFor="from">Od:</label>
            <input type="date" id="from" onChange={(e) => {setFromDate(e.target.value)}}/>
          </div>
          <div className="fieldBox">
            <label htmlFor="to">Do:</label>
            <input type="date" id="to" onChange={(e) => {setToDate(e.target.value)}}/>
          </div>
        </div>
        <div className="fieldBox">
          <label htmlFor="status">Status:</label>
          <select type="select" id="status" value={statusSearch} onChange={(e) => {setSearchValue(e.target.value)}}>
            <option value="">Wszystkie</option>
            <option value="placed">Złożone</option>
            <option value="payed">Opłacone</option>
            <option value="hold">Oczekujące</option>
            <option value="finished">Zakończone</option>
            <option value="canceled">Anulowane</option>
          </select>  
        </div>
      </div>
      <div className="adminOrders__row">
          <div className="adminOrders__col id heading" onClick={() => sortAction('id')}>Numer</div>
          <div className="adminOrders__col email heading"onClick={() => sortAction('email')}>Adres email</div>
          <div className="adminOrders__col client heading">Imię i nazwisko</div>
          <div className="adminOrders__col date heading"onClick={() => sortAction('date')}>Data</div>
          <div className="adminOrders__col value heading"onClick={() => sortAction('value')}>Wartość</div>
          <div className="adminOrders__col status heading"onClick={() => sortAction('status')}>status</div>
        </div>
      {isPennding ? <div>Wczytywanie danych</div> : <></>}
      {err ? <div>{err}</div> : <></>}
      {filteredOrders ? <div className="adminOrders__table">
        {filteredOrders.map(order => {
      const orderDate = new Date(order.timestamp)
      const orderDateString = orderDate.toLocaleDateString('ISO', { day:"numeric",  month:"short", year:"numeric" })
      return (
        <div className="adminOrders__row" key={order.id}>
          <div className={`adminOrders__col id ${order.unread === 'true' ? 'unread' : ''}`} onClick={() => viewOrder(order.id, true)}>{order.id}</div>
          <div className="adminOrders__col email">{(JSON.parse(order.billingData)).email}</div>
          <div className="adminOrders__col client">{(JSON.parse(order.billingData)).name} {(JSON.parse(order.billingData)).surname}</div>
          <div className="adminOrders__col date">{orderDateString}</div>
          <div className="adminOrders__col value">{Math.round((order.orderValue + order.shippingCost)*100)/100}</div>
          <div className={`adminOrders__col status ${order.status}`}></div>
        </div>
      )})}</div> : <></>}
    </div>
  )
}
