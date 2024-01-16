import React from 'react'
import { useLocation } from "react-router";

import Navigation from './Navigation'
import Logo from './Logo'

export default function Footer() {

  let path = useLocation()

  return (
    <>{path.pathname === '/logowanie' || path.pathname === '/rejestracja' ? <></> :
      <>
        <br></br>
        <hr></hr>
        <div className='footer'>
          <div className='footer__inner'>
          <div className='footer__seo footer__part'>
            <h3>Sklep internetowy</h3>
            <p>To jest krótki opis strony, na któej się znajdujesz. Można tu podać najważnijesze informacje do celów pozycjonowania.</p>
          </div>
          <div className='footer__navigation footer__part'>
          <h3>Menu</h3>
            <Navigation />
          </div>
          <div className='footer__navigation footer__part'>
          <h3>Na skróty</h3>
            <Navigation />
          </div>
          <div className='footer__info footer__part'>
            <h3>Nazwa Firmy</h3>
            <p>ul. Przykładowa 24</p>
            <p>21-300 Radzyń Podlaski</p>
            <p>NIP 5443222123</p>
            <p>Tel. 577903117</p>
          </div>
          <div className='footer__info footer__part'>
            <Logo />
          </div>
        </div>
        </div>
      </>
      }   
    </>
  )
}
