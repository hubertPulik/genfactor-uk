import { useState, useEffect } from "react"

import { useGetData } from './useGetData';

export const useGetProduct = (productId) => {
  
  const [ prod, setProd ] = useState([]);
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr ] = useState(null);

  const { data: product, err: productErr } = useGetData(`/api/products/${productId}`)

  useEffect(() => {
    if (productErr) {
      setErr(productErr)
    } else {
      setProd(product[0]);
      setIsPennding(false);
    }
  }, [product, productErr]);

  return { prod, isPennding, err }
}