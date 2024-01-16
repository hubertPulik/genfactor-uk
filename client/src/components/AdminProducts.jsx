import { useState, useEffect } from "react"
import Axios from 'axios'

import AdminProductsTable from "./AdminProductsTable"
import AdminProduct from "./AdminProduct"

export default function AdminProducts() {

  const [ products, setProducts ] = useState([])
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr ] = useState(null)
  const [ productDetails, setProductDetails ] = useState(false)
  const [ activeProduct, setActiveProduct ] = useState()

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/products`)
      .then(res => {
        setProducts(res.data);
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

  const viewProduct = (productId, state) => {
    setProductDetails(state)
    setActiveProduct(productId)
  }

  return (
    <>
    {productDetails ?
    (products.length !== 0 ? 
    <AdminProduct productId={activeProduct} viewProduct={viewProduct}/> : <></>) :
    <AdminProductsTable 
      products={products}
      isPennding={isPennding}
      err={err}
      viewProduct={viewProduct}
    /> }
    </>
    
  )
}
