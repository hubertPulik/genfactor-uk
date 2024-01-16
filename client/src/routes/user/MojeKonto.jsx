import { useState, useEffect } from "react";

import { useAuth } from "../../controllers/useAuth"
import { useUser } from "../../controllers/UserContext";

import { BsPersonCircle } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import MyAccountData from "../../components/MyAccountData";
import MyAccountOrders from "../../components/MyAccountOrders";
import MyAccoutnUser from "../../components/MyAccoutnUser";
// import { FaHeart } from "react-icons/fa";
// import { FaEnvelope } from "react-icons/fa";
// import { FaGift } from "react-icons/fa";


export default function MojeKonto() {

  const userLoggedIn = useAuth()

  const userObject = useUser()

  const [ user, setUser ] = useState(userObject)

  useEffect(() => {
    setUser(userObject.user)
  }, [userObject])

  return (
    <>
      {!userLoggedIn ? <div>Nie jesteś zalogowany</div> : 
      <div className="user__account">
        <div className="user__account__card">
          <div className="user__account__icon">
           <BsPersonCircle />
          </div>
            <h3 className="user__account__cardname">Moje konto</h3>
        </div>
        <br />
        <p>W tej sekcji znajdziesz informcaje na jaki adres email założone jest konto oraz możesz zmienić lub zresetować hasło</p>
        <MyAccoutnUser user={user} />
        <div className="user__account__card">
          <div className="user__account__icon">
           <FaRegListAlt />
          </div>
            <h3 className="user__account__cardname">Moje zamówienia</h3>
        </div>
        <br />
        <p>Tutaj znajdziesz historię swoich zamówień. Możesz sprwadzić co i kiedy zamawiałeś, a także jaki jest status rozpoczętych zamówień.</p>
        <MyAccountOrders user={user} />
        <div className="user__account__card">
          <div className="user__account__icon">
           <FaClipboardCheck />
          </div>
            <h3 className="user__account__cardname">Moje dane</h3>
        </div>
        <br />
        <p>W tej sekcji sprawdzisz i uaktualnisz swoje dane rozliczeniowe a także adres do wysyłek.</p>
        <MyAccountData user={user} />
        <br />
        <br />
        <br />
        <br />
        {/* <div className="user__account__card">
          <div className="user__account__icon">
           <FaHeart />
          </div>
            <h3 className="user__account__cardname">Ulubione produkty</h3>
        </div>
        <br />
        <p>Stąd masz szybki dostęp do swoich ulubionych produktów.</p>
        <br />
        <br />
        <br />
        <br />
        <div className="user__account__card">
          <div className="user__account__icon">
           <FaEnvelope />
          </div>
            <h3 className="user__account__cardname">Skrzynka odbiorcza</h3>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="user__account__card">
          <div className="user__account__icon">
           <FaGift />
          </div>
            <h3 className="user__account__cardname">Program lojalnościowy</h3>
        </div> */}

      </div>
      }
    </>
    
  )
}
