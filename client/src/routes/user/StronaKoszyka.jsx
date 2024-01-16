//basic
import { useState, useEffect } from 'react'

import CartItem from "../../components/CartItem"

import { useCart } from '../../controllers/Cart'
import { useDispatchCart } from '../../controllers/Cart'


export default function Koszyk() {

  const userCart = useCart()
  const readCart = useDispatchCart()

  const [ cartValue, setCartValue ] = useState()

  useEffect(() => {
    if (userCart) {
      let value = 0;
      for (let i = 0; i < userCart.length; i++) {
        value = Math.round((value + (userCart[i].netto * userCart[i].vat * userCart[i].quantity))*100)/100
      }
      setCartValue(value)
    }
  }, [userCart])

  useEffect(() => {
    readCart({ type: "READ"})
  }, [readCart])

  return (
    <>
      {!userCart ? 
      <h3>Ładowanie...</h3> :
      userCart.length === 0 ? 
      <h3>Nie masz jeszcze w koszyku żadnych produktów</h3> :
      <div className='cart'>
        <div className='cart__items'>
          {userCart.map(cartProduct => 
            (<CartItem key={cartProduct.productId} cartProduct={cartProduct} />
          ))}
        </div>
        <div className='cart__details'>
          <h3 className='cart__item__qty'>Suma: </h3>
          <h3 className='cart__item__price'>{cartValue}</h3>
          <div className="cart__item__icon">
        </div>
        </div>
      </div>
      }
    </>
  )
}
