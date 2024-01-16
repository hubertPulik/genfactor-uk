import { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";

export default function Rating({rating}) {

  const [ activeStar, setActiveStar ] = useState(rating);

  const handleHover = (starId) => {
    setActiveStar(starId)
  }

  useEffect(() => {
    setActiveStar(rating)
  }, [rating])

  return (
    <div onMouseLeave={() => handleHover(rating)} className="rating__bar">
      <div className="rating__stars">
        <FaStar onMouseEnter={() => handleHover(1)} className={activeStar > 0 ? 'rating__star__hover' : 'rating__star'}/>
        <FaStar onMouseEnter={() => handleHover(2)} className={activeStar > 1 ? 'rating__star__hover' : 'rating__star'}/>
        <FaStar onMouseEnter={() => handleHover(3)} className={activeStar > 2 ? 'rating__star__hover' : 'rating__star'}/>
        <FaStar onMouseEnter={() => handleHover(4)} className={activeStar > 3 ? 'rating__star__hover' : 'rating__star'}/>
        <FaStar onMouseEnter={() => handleHover(5)} className={activeStar > 4 ? 'rating__star__hover' : 'rating__star'}/>
      </div>
      <div className="rating__stars__overlay"></div>
    </div>
  )
}
