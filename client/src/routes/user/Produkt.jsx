import { useParams } from 'react-router'
import { useState, useEffect } from "react"
import { motion } from 'framer-motion'

import { useGetProduct } from '../../hooks/useGetProduct'
import { useDispatchCart } from '../../controllers/Cart';

import Rating from '../../components/Rating'
import Quantity from '../../components/Quantity'

export default function Product() {

  const productId = useParams()
  const id = parseInt(productId.id)

  const dispatch = useDispatchCart()

  const { prod: p, isPennding, err } = useGetProduct(id)

  const [ product, setProduct ] = useState(null);
  const [ quantity, setQuantity ] = useState(1);
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(() => {
    setProduct(p)
  }, [p]);

  const handleQuantityChange = (direction) => {
    if (direction === 'minus') {
      setQuantity(prevQuantity => prevQuantity - 1)
    } else if (direction === 'plus') {
      setQuantity(prevQuantity => prevQuantity + 1)
    }
  }

  useEffect(() => {
    if (product) {
      setTotalPrice(product.netto * quantity) ;
    } else {
      setTotalPrice(0)
    }
  }, [product, quantity])

  let cartPayload;

  if (product) {
    cartPayload = {
      productId: product.id,
      netto: product.netto,
      vat: product.vat,
      quantity: quantity
    }
  }

  const addToCart = (item) => {
    dispatch({ type: "ADD", item })
  }

  useEffect(() => {
    dispatch({ type: "READ"})
  }, [dispatch])

  const variants = {
    active: {
      scale: .95,
      rotate: -3,
      transition: {
        duration: 0.9,
        type: "spring", 
        stiffness: 100
      }
    }
  }

  console.log(product)

  return (
    <>
      {err ? <div>{err}</div> :
      (!product || isPennding) ? <h2>Ładowanie...</h2> : <div className='single__product'>
        <div className='single__img'>
          <motion.div className='product__img' style={{ backgroundImage: `url('${product.main_img}')` }} whileHover='active' variants={variants}></motion.div>
        </div>
        <div className='single__info'>
          <h2 className='single__name'>{product.name}</h2>
          {!product.netto ? <h3>...</h3> : <h2 className='single__product__price'>{Math.round(totalPrice*product.vat*100)/100}</h2>}
          <div className='single__ratings'>
            <Rating rating={product.rating}/>
          </div>
          <p className='single__category'>{product.category}</p>
          <div className='single__description' dangerouslySetInnerHTML={{__html: product.description}}/>
          <Quantity handleQuantityChange={handleQuantityChange}>{quantity}</Quantity>
          <button className="btn-alert" onClick={() => addToCart(cartPayload)} >Dodaj do koszyka</button>
        </div>
      </div>
      }
    </>
    
  )
}
