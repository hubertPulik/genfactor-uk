import { useState, useEffect } from "react"

import { useGetProduct } from "../hooks/useGetProduct"
import { useDispatchCart } from '../controllers/Cart';

import { FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

export default function CartItem({cartProduct}) {

  const { prod, isPennding, err } = useGetProduct(cartProduct.productId)

  const dispatch = useDispatchCart()

  const [ item, setItem ] = useState()
  const [ product, setProduct ] = useState()
  const [ quantity, setQuantity ] = useState()
  const [ cartPayload, setCartPayLoad ] = useState()

  useEffect(() => {
    if (prod) {
      setProduct(prod)
    }
    if (err) {
      console.log(err)
    }
  }, [prod, isPennding, err])

  useEffect(() => {
    setItem(cartProduct)
  }, [cartProduct])

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity)
    }
  }, [item])

  const handleQuantityChange = (direction) => {
    if (direction === 'minus') {
      dispatch({ type: "DECREASE", item })
      setItem(cartProduct)
    } else if (direction === 'plus') {
      dispatch({ type: "INCREASE", item })
      setItem(cartProduct)
    }
  }

  useEffect(() => {
    if (item) {
      setCartPayLoad(item.productId)
    }
  }, [item])

  const deleteFromCart = (item) => {
    dispatch({ type: "DELETE", item })
    setItem(cartProduct)
  }

  return (
    <>
    {isPennding || !cartProduct || !item || !product ? <h3>...</h3> : 
    <div className='cart__item'>
      <div className='cart__item__left'>
        <div className='cart__thumbnail' style={{ backgroundImage: `url('${product.main_img}')` }}></div>
        <h3>{product.name}</h3>
      </div>
      <div className='cart__item__right'>
        <h3 className='cart__item__qty'>
        {quantity === 1 ? <FiMinusCircle className="quantity__icon"/> :<FiMinusCircle className="quantity__icon" onClick={() => handleQuantityChange('minus')}/>}
            {quantity}
          <FiPlusCircle className="quantity__icon" onClick={() => handleQuantityChange('plus')}/>
        </h3>
        {!product.netto ? <h3>...</h3> : <h3 className='cart__item__price'>{Math.round(product.netto*product.vat*quantity*100)/100}</h3>}
        <div className="cart__item__icon">
          <FaTrash onClick={() => deleteFromCart(cartPayload)}/>
        </div>
      </div>
    </div>}
    </>
  )
}
