import { NavLink } from 'react-router-dom'

import { motion } from 'framer-motion'

import { useDispatchCart } from '../controllers/Cart';

export default function ProductCard({product}) {

  const dispatch = useDispatchCart()

  const cartPayload = {
    productId: product.id,
    name: product.name,
    netto: product.netto,
    vat: product.vat,
    quantity: 1
  }

  const addToCart = (item) => {
    dispatch({ type: "ADD", item })
  }

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

  return (
    <>
      {!product && !product.netto ? <h3>...</h3> : <>
        <div className="card__top">
          <NavLink to={`/produkt/${product.id}`}>
            <motion.div className='thumbnail' style={{ backgroundImage: `url('${product.main_img}')` }} whileHover='active' variants={variants}></motion.div>
          </NavLink>
          <div className="card__heading">
            <NavLink to={`/produkt/${product.id}`}>
              <h3 className="card__product__name">{product.name}</h3>
            </NavLink>
            {!product.netto ? <h3>...</h3> : <h3 className="product__price">{Math.round(product.netto*product.vat*100)/100}</h3>}
          </div>
        </div>
        <div className="product__btn flex-between">
          <NavLink to={`/produkt/${product.id}`}><button className="btn">Szczegóły</button></NavLink>
          {<button onClick={() => addToCart(cartPayload)} className="btn-alert">Dodaj do Koszyka</button>}
        </div>
      </>}
    </>
  )
}
