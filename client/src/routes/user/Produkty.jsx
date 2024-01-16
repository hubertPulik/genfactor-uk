import { useState, useEffect } from 'react';

import { FaList } from "react-icons/fa";
import { FaGripHorizontal } from "react-icons/fa";

import { useDispatchCart } from '../../controllers/Cart';

import Grid from '../../components/Grid';
import List from '../../components/List';

function Produkty() {

  const [ displayType, setDisplayType ] = useState('grid');

  const dispatch = useDispatchCart()


  const toggleDisplayType = (type) => {
    setDisplayType(type)
  }

  useEffect(() => {
    dispatch({ type: "READ"})
  }, [dispatch])

  return (
    <div className="produkty">
      <div className='toggle__controls'>
        <button className='btn__toggle' onClick={() => toggleDisplayType('list')}><FaList /></button>
        <button className='btn__toggle' onClick={() => toggleDisplayType('grid')}><FaGripHorizontal /></button>
      </div>
      {displayType === 'grid' ? <Grid /> : <List />}
    </div>
  );
}

export default Produkty;