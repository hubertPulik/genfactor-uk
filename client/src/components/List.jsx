import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'

import { useGetProducts } from '../hooks/useGetProducts';

import ProductItem from './ProductItem'

function List() {

  const { prods, isPennding, err } = useGetProducts();

  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    setProducts(prods)
  }, [prods]);

  const variants = {
    active: {
        scale: .95,
        rotate: 0,
        transition: {
            duration: 0.9,
            type: "spring", 
            stiffness: 100
        }
    }
  }

  if (err) {
    console.log(err)
  }

  return (
    <>
      {err ? <div>{err}</div> :
      <div className="list">
        {isPennding ? <h3>Ładowanie...</h3> : 
          products.map((product) => (
            <motion.div className='list__card' key={product.id} whileHover='active' variants={variants}>
              <ProductItem product={product} />
            </motion.div>
        ))}
      </div>}
    </>
  );

}

export default List;
