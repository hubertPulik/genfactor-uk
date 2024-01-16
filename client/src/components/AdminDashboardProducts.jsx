import { useState, useEffect } from "react"

export default function AdminDashboardProducts({ orders, isPennding }) {

  const [ products, setProducts ] = useState({})
  const [ allProducts, setAllProducts ] = useState()

  const countProduct = (productName) => {
    console.log(products)
    if (products[productName]) {
      setProducts(prevProducts => ({...prevProducts, [productName]: prevProducts[productName] + 1}))
    } else {
      setProducts(prevProducts => ({...prevProducts, [productName]: 1}))
    }
  }

  useEffect(() => {
    allProducts && allProducts.forEach(item => {(countProduct(item))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })}, [allProducts])

  useEffect(() => {
    const all = []
    orders.map(order => (
      (JSON.parse(order.orderItems)).map(item => (
        all.push(item.name)
      ))
    ))
   setAllProducts(all)
  }, [orders, isPennding])

  return (
    <>
    {isPennding ? <></> :
      <div className='adminDashboard__products'>
        <h3>Najczęściej kupowane produkty</h3>
        <div>
          
        </div>
      </div>
    }
    </>
    
  )
}
