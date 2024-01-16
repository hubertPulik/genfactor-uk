import { useState, useEffect } from "react"
import Axios from 'axios'

import { sortOrdersId, sortOrdersDate, sortOrdersEmail, sortOrdersStatus, sortOrdersValue } from "../controllers/Sorting"
import { filterAction, filterDateAction } from "../controllers/Filtering"
import AdminOrdersTable from "./AdminOrdersTable"
import AdminOrder from "./AdminOrder"

export default function AdminOrders() {

  const [ orders, setOrders ] = useState([])
  const [ filteredOrders, setFilteredOrders ] = useState()
  const [ sortedOrders, setSortedOrders ] = useState()
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr ] = useState(null)
  const [ direction, setDirection ] = useState('descending')
  const [ orderDetails, setOrderDetails ] = useState(false)
  const [ activeOrder, setActiveOrder ] = useState()

  const [ searchValue, setSearchValue ] = useState()
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
    setSortedOrders(sortOrdersId(orders, direction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, direction])
  
  useEffect(() => {
    if (sortedOrders) {
      setFilteredOrders(sortedOrders)
    }
  }, [orders, sortedOrders])

  useEffect(() => {
    if (sortedOrders) {
      setFilteredOrders(filterAction(orders, searchValue))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, fromDate, toDate])

  useEffect(() => {
    if (sortedOrders) {
      setFilteredOrders(filterDateAction(orders, fromDate, toDate))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate])

  const sortAction = (property) => {
    let dir = direction
    if (direction === 'descending') {
      dir = 'ascending'
    } else if (direction === 'ascending') {
      dir = 'descending'
    }
    switch(property) {
      case 'id':
        setFilteredOrders(sortOrdersId(filteredOrders, dir))
        setDirection(dir)
        break
      case 'email':
        setFilteredOrders(sortOrdersEmail(filteredOrders, dir))
        setDirection(dir)
        break
      case 'date':
        setFilteredOrders(sortOrdersDate(filteredOrders, dir))
        setDirection(dir)
        break
      case 'value':
        setFilteredOrders(sortOrdersValue(filteredOrders, dir))
        setDirection(dir)
        break
      case 'status':
        setFilteredOrders(sortOrdersStatus(filteredOrders, dir))
        setDirection(dir)
        break
      default:
        return
    }
  }

  const viewOrder = (orderId, state) => {
    setOrderDetails(state)
    setActiveOrder(orderId)
  }

  const markRead = (orderId) => {
    const allOrders = filteredOrders.filter(order => {return order.id !== orderId})
    const oneOrder = filteredOrders.filter(order => {return order.id === orderId})[0]
    const markedOrder = {...oneOrder, unread: 'false'}
    const newFilteredOrders = [...allOrders, markedOrder]
    setFilteredOrders(sortOrdersId(newFilteredOrders, direction))
    Axios.post(`http://localhost:3001/api/admin/orders/mark/${orderId}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const statusChange = (orderId, status) => {
    const allOrders = filteredOrders.filter(order => {return order.id !== orderId})
    const oneOrder = filteredOrders.filter(order => {return order.id === orderId})[0]
    const markedOrder = {...oneOrder, status: status}
    const newFilteredOrders = [...allOrders, markedOrder]
    setFilteredOrders(sortOrdersId(newFilteredOrders, direction))
    Axios.post(`http://localhost:3001/api/admin/orders/update/${orderId}`, {
      status
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
    {orderDetails ?
    (orders.length !== 0 ? 
    <AdminOrder 
      order={orders.filter(order => {return order.id === activeOrder})[0]} 
      viewOrder={viewOrder} 
      markRead={markRead}
      statusChange={statusChange}
    /> : <></>) :
    <AdminOrdersTable 
      filteredOrders={filteredOrders} 
      isPennding={isPennding} err={err} 
      setSearchValue={setSearchValue}
      searchValue={searchValue}
      setFromDate={setFromDate} 
      setToDate={setToDate} 
      sortAction={sortAction}
      viewOrder={viewOrder}
    /> }
    </>
    
  )
}
