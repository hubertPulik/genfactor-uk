import { useState, useEffect } from "react"
import Axios from 'axios'

import { filterDateAction } from "../controllers/Filtering"
import AdminDashboardValue from "./AdminDashboardValue"
import AdminDashboardOrders from "./AdminDashboardOrders"
import AdminDashboardProducts from "./AdminDashboardProducts"


export default function AdminDashboard() {

  const [ orders, setOrders ] = useState([])
  const [ filteredOrders, setFilteredOrders ] = useState()
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr ] = useState(null)

  const [ fromDate, setFromDate ] = useState()
  const [ toDate, setToDate ] = useState()

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/admin/orders`)
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
  }, [])

  
  useEffect(() => {
    if (orders) {
      setFilteredOrders(orders)
    }
  }, [orders])

  useEffect(() => {
    if (filteredOrders) {
      setFilteredOrders(filterDateAction(orders, fromDate, toDate))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate])

  const createInvoice = () => {
    console.log('dodaj fakturę')
    Axios.get(`http://localhost:3001/api/admin/wfirma`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="adminDashboard__filter">
        <div className="adminOrders__row adminOrders__searchbar">
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
        </div>
      </div>
      {isPennding ? <div>Wczytywanie danych</div> : <></>}
      {err ? <div>{err}</div> : <></>}
      {!isPennding && filteredOrders && filteredOrders.length !== 0 ? 
      <div>
        <AdminDashboardValue orders={filteredOrders} isPennding={isPennding} />
        <AdminDashboardOrders orders={filteredOrders} isPennding={isPennding} />
        <AdminDashboardProducts orders={filteredOrders} isPennding={isPennding} />
        <br />
        <button className="btn" onClick={() => createInvoice()}>Dodaj fakturę</button>
      </div>
      : <></>}
    </>
  )
}
