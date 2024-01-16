import { NavLink } from 'react-router-dom'
import { useState, useEffect } from "react"

import { useDispatchCart } from '../controllers/Cart';

import Quantity from './Quantity'
import Rating from './Rating'

export default function ProductCard({product}) {

  const dispatch = useDispatchCart()
 
  const [ quantity, setQuantity ] = useState(1);
  const [ totalPrice, setTotalPrice ] = useState(0)

  const handleQuantityChange = (direction) => {
    if (direction === 'minus') {
      setQuantity(prevQuantity => prevQuantity - 1)
    } else if (direction === 'plus') {
      setQuantity(prevQuantity => prevQuantity + 1)
    }
  }

  useEffect(() => {
    setTotalPrice(product.netto * quantity) ;
  }, [product.netto, quantity])


  const cartPayload = {
    productId: product.id,
    netto: product.netto,
    vat: product.vat,
    quantity: quantity
  }

  const addToCart = (item) => {
    dispatch({ type: "ADD", item })
  }



  return (
    <>
      {!product.netto ? <h3>...</h3> : <div className="list__item">
        <NavLink to={`/produkt/${product.id}`}><div className='list__thumbnail' style={{ backgroundImage: `url('${product.main_img}')` }}></div></NavLink>
        <div className='list__item__info'>
          <div className="flex-between">
          <NavLink to={`/produkt/${product.id}`}><h3>{product.name}</h3></NavLink>
          </div>
          <p className="product__description">{product.description}</p>
          <p>{product.category}</p>
        </div>
        <div className="product__btn">
          <div className='list__qty__price'>
            <Quantity handleQuantityChange={handleQuantityChange}>{quantity}</Quantity>
            {!product.netto ? <h3>...</h3> :<h3 className="list__product__price">{Math.round(totalPrice*product.vat*100)/100}</h3>}
          </div>
          <button className="btn-alert" onClick={() => addToCart(cartPayload)}>Dodaj do koszyka</button>
          <NavLink to={`/produkt/${product.id}`}>
            <button className="btn">Szczegóły</button>
          </NavLink>
          <Rating rating={product.rating}/>
        </div>
      </div>}
    </>
  )
}
