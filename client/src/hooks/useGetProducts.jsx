import { useState, useEffect } from "react"

import { useGetData } from './useGetData';

export const useGetProducts = () => {
  
  const [ prods, setProds ] = useState([]);
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr ] = useState(null);

  const { data: products, err: productErr } = useGetData('/api/products')
  
  useEffect(() => {
    if (productErr) {
      setErr(productErr)
    } else {
      setProds(products);
      setIsPennding(false);
    }
  }, [products, productErr]);

  return { prods, isPennding, err }
}