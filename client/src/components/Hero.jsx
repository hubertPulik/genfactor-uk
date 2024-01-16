import React from 'react'

export default function Hero() {
  return (
    <div className='hero'>
      <div className='hero__box'>
        <div className='hero__text'>
          <img src="../assets/gf-logo.png" alt="" />
          <h4>Gen Factor is a series of breakthrough preparations used in aesthetic medicine and advanced cosmetology for regeneration of the skin and control of DNA expression.</h4>
          <button className='marginTop'>Learn more</button>
        </div>
        <div className='hero__img'>
          <img src="../assets/hero-img.png" alt="gen factor" />
        </div>
      </div>
    </div>
  )
}
