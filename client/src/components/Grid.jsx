import { useEffect, useState } from 'react';

import { useGetProducts } from '../hooks/useGetProducts';

import ProductCard from './ProductCard'

function Grid() {

  const { prods, isPennding, err } = useGetProducts();

  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    setProducts(prods)
  }, [prods]);

  return (
    <>
    {err ? <div>{err}</div> : 
    <div className="grid">
      {isPennding  ? <h3>Ładowanie...</h3> : 
        products.map((product) => (
        <div className='grid__item' key={product.id} >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
    }
    </>
  );
}

export default Grid; 
