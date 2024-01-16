import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Axios from "axios" 

import { useUser } from '../../controllers/UserContext'
import { useCart } from '../../controllers/Cart'
import { useForm } from 'react-hook-form'


import BillingForm from '../../components/BillingForm'
import ShippingForm from '../../components/ShippingForm'
import LoginForm from '../../components/LoginForm'

import { defaultShema, shippingShema, companyShema, shippingCompanyShema } from '../../controllers/ValidationShemas'

export default function Order() {
  
  // const [ user, setUser ] = useState()
  const user = useUser()
  const userCart = useCart()
  
  const [ isCompany, setIsCompany ] = useState(false)
  const [ differentShipping, setDifferentShipping ] = useState(false)
  const [ shippingMethod, setShippingMethod ] = useState('')
  const [ shippingCost, setShippingCost ] = useState(0)
  const [ orderValue, setOrderValue ] = useState(0)
  const [ productsValue, setProductsValue ] = useState(0)
  const [ combinedShema, setCombinedShema ] = useState(defaultShema)
  const [ loginUser, setLoginUser ] = useState(false)
  const [ userData, setUserData ] = useState({})

  const handleLoggedInUser = () => {
    console.log(user.auth)
  }

  useEffect(() => {
    if (isCompany && differentShipping) {
      setCombinedShema(shippingCompanyShema)
    } else if (isCompany) {
      setCombinedShema(companyShema)
    } else if (differentShipping) { 
      setCombinedShema(shippingShema)
    } else {
      setCombinedShema(defaultShema)
    }
  }, [isCompany, differentShipping])
  
  const { register, handleSubmit, formState, reset } = useForm({ resolver: zodResolver(combinedShema)});

  const { errors } = formState

  useEffect(() => {
    if(user.auth && user.user) {
      const d = user.user.shippingAddress
      const data = {
        ...user.user.billingAddress, email: user.user.email, repeatEmail: user.user.email, shippingName: d.name, shippingSurname: d.surname, shippingCopanyName: d.companyName, shippingStreet: d.street, shippingAddressNumber1: d.addressNumber1, shippingAddressNumber2: d.addressNumber2, shippingZipCode: d.zipCode, shippingCity: d.city, shippingCountry: d.country, shippingPhone: d.phone}
      setUserData(data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    reset({...userData})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    let productsCost = 0
    if (userCart) {
      userCart.map((item) => {
        return productsCost = productsCost + item.netto*item.vat*item.quantity
      })
    }
    setProductsValue(Math.round(productsCost*100)/100)
  }, [userCart])

  useEffect(() => {
    setOrderValue(productsValue + shippingCost)
  }, [shippingCost, productsValue])

  const companyToggle = (e) => {
    setIsCompany(prevIsCompany => !prevIsCompany)
  }

  const shippingToggle = (e) => {
    setDifferentShipping(prevDifferentShipping => !prevDifferentShipping)
  }

  const shippingCostChange = (e) => {
    if (e.target.id === "pickup") {
      setShippingMethod('pickup')
      setShippingCost(0)
    } else if (e.target.id === "delivery") {
      setShippingMethod('delivery')
      setShippingCost(15)
    } else if (e.target.id === "box") {
      setShippingMethod('box')
      setShippingCost(10)
    }
  }

  const loginForm = (e) => {
    setLoginUser(prevLoginUser => !prevLoginUser)
  }

  const submitOrder = (data) => {
    console.log(data)

    const billingData = {
      email: data.email,
      repeatEmail: data.repeatEmail,
      name: data.name,
      surname: data.surname,
      companyName: isCompany ? data.companyName : null,
      taxNumber: isCompany ? data.taxNumber : null,
      street: data.street,
      addressNumber1: data.addressNumber1,
      addressNumber2: data.addressNumber2,
      city: data.city,
      zipCode: data.zipCode,
      country: data.country,
      phone: data.phone,
    }

    const shippingData = {
      name: differentShipping ? data.shippingName : data.name,
      surname: differentShipping ? data.shippingSurname : data.surname,
      companyName: differentShipping && isCompany ? data.shippingCompanyName : null,
      street: differentShipping ? data.shippingStreet : data.street,
      addressNumber1: differentShipping ? data.shippingAddressNumber1 : data.addressNumber1,
      addressNumber2: differentShipping ? data.shippingAddressNumber2 : data.addressNumber2,
      city: differentShipping ? data.shippingCity : data.city,
      zipCode: differentShipping ? data.shippingZipCode : data.zipCode,
      country: differentShipping ? data.shippingCountry : data.country,
      phone: differentShipping ? data.shippingPhone : data.phone
    }

    const orderInfo = data.orderInfo

    createOrder(billingData, shippingData, orderInfo)
  }

  const createOrder = (billingData, shippingData, orderInfo) => {
    const order = {
      userId: user.user.id,
      userBillingData: billingData,
      userShippingData: shippingData,
      differentShipping: differentShipping,
      orderItems: userCart,
      orderValue: orderValue,
      shippingMethod: shippingMethod,
      shippingCost: shippingCost,
      userIsCompany: isCompany,
      paymentMethod: '',
      orderInfo: orderInfo
    }
    console.log(order)
    Axios.post('http://localhost:3001/api/create-order', {
      order
    }).then((response) => {
      console.log(response)
      window.location.replace(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const showError = (errors) => {
    console.log(errors)
  }

  const callback = (params) => {
    console.log('Kod wybranego punktu:', params.point.code);
  }
  const handleClickMap = () => {
    new window.Furgonetka.Map({
    courierServices: ['inpost'],
    city: 'Warszawa',
    street: 'Żoliborz',
    callback: callback,
    }).show();
  }

  const onPointSelect = (point) => {
    console.log(point)
  }

  return (
    <div className="order">
      <h2 className="title">Zamówienie</h2>
      <p className="undertitle">Prosimy o dokładne i poprawne wypełnienie formularza zamówienia oraz o wybór sposobu dostawy i metody płatności. Jeśli chesz, aby towar został wysłany na inny adres niż dane rozliczeniowe, to zaznacz odpowiedni punkt i podaj dane do wysyłki. Jeśli wybierzesz formę płatności PayU lub Blik, to po kliknięciu przycisku "Zamawiam i płacę" nastąpi przekierwanie na stronę operatora płatności.</p>
      <br />
      <br />

      <div className="order__table">
        {/* left side --------------------------------------------------------------------------------- */}
        <div className="order__left">
          {user.length === 0 || !user.auth ? <>
          <div className="input__line__checkbox">
          <input type="checkbox" name="login" id='login' value={loginUser} onChange={loginForm}/>
          <label htmlFor='login'>Mam już konto i chcę się zalogować</label>
          </div>
          {loginUser ? <LoginForm location={'orderPage'} action={handleLoggedInUser}/> : <></>}
          </> : <></>}
          <h3>Dane do zamówienia</h3>
          <form action="" id='order_form' className="order__form" onSubmit={handleSubmit(submitOrder, showError)}>
            <BillingForm register={register} errors={errors} companyToggle={companyToggle} isCompany={isCompany} location={'orderPage'}/>
            <br />
            {/* Shipping data ---------------------------------------------------------------------------- */}
            <div className="input__line__checkbox">
              <input type="checkbox" name="additional_shipping" id='additional_shipping' value={differentShipping} onChange={shippingToggle}/>
              <label htmlFor='additional_shipping'>Wysyłka na inny adres</label>
            </div>
            {differentShipping ? <ShippingForm register={register} errors={errors} isCompany={isCompany} />
               : <></>}
          </form>
        </div>
        {/* right side ------------------------------------------------------------------------------ */}
        <div className="order__right">
          {/* shipping methods ------------------------------------------------------------------ */}
          <div className="shipping">
            <h3>Wybierz formę dostawy</h3>
            <ul className="shipping__items">
              <li className="detail__item">
                <span><input type="radio" name="shipping_method" id="pickup" checked={shippingMethod === "pickup"} onChange={shippingCostChange}/><span><label htmlFor="pickup">Odbiór osobist</label>y</span></span><span className="order__price">0</span>
              </li>
              <li className="detail__item">
                <span><input type="radio" name="shipping_method" id="delivery" checked={shippingMethod === "delivery"} onChange={shippingCostChange}/><span><label htmlFor="delivery">Przesyłka kurierska</label></span></span><span className="order__price">15</span>
              </li>
              <li className="detail__item">
                <span><input type="radio" name="shipping_method" id="box" checked={shippingMethod === "box"} onChange={shippingCostChange}/><span><label htmlFor="box">Paczkomat</label></span></span><span className="order__price">10</span>
              </li>
              {shippingMethod === 'box' && 
                <div>
                  <p>Wybierz swój paczkomat</p>
                  <inpost-geowidget onpoint="afterPointSelected" token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMDY1MzA1MzYsImlhdCI6MTY5MTE3MDUzNiwianRpIjoiN2IzZGNiOWYtMjFlNi00ZDg2LWI2MTgtMGNiMzQwMmZhMzlhIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTp6cnpwSURUcHZLdE5UX1NZNmVZSzdjVkVzMzhpN3Y5Ui14VzcxbDBaYk1BIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiODA3NjEwOTUtMjhlOC00ZGUyLWFmY2ItZWZiZDI5ZjFiZGFhIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjgwNzYxMDk1LTI4ZTgtNGRlMi1hZmNiLWVmYmQyOWYxYmRhYSIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6Ijk4MzQ4Y2QyLWUyYmYtNDI2OC1iYzFjLTU3MDE0NTA1ZmU5ZCJ9.nvbAQozVPGnroOyjSPzytKddOpYNST5NqZk7fxmO8ToMizWddl7lUwKOZxizuKVpEbHYKahdaCcvIKnY1Rxgt-as-CbrHth_B3tmzcl4rA2Q3AtvG1xZKLZlxRC-w-0RDKI1iheplI1MzbwEN76V7FwKkxHyDEbImzhUFSrU6wNHSGw9gwtiq3JzbmA_oAxr_82wgwxeCDM4uBrRw2cwxEg49OxtcdOJHq9xYmdPbTPicaZNhgpDqtfi4FJNwmATGq8P4yoh5n0UCQzNCnk_zZPuJ4yhYYp0yji8ldy2GJp7UurTMfzqiAbINybqtdSXRw65GdD3Yu7KbfTnlQf09A' language='pl' config='parcelcollect'></inpost-geowidget>
                </div>
              }
            </ul>
          </div>
          {/* order summary ------------------------------------------------------------ */}
          <div className="summary">
            <h3>Podsumowanie zamówienia</h3>
            <ul className="summary__list">
              {user.userCart ? user.userCart.map((item) => (
                <li key={item.productId} className="detail__item">
                  <span><strong>{item.quantity}</strong> x {item.name}</span><span className="order__price">{Math.round(item.netto*item.vat*item.quantity*100)/100}</span>
                </li>
              )) : <div></div> }
              <li className="detail__item">
                <span><span>Łączny koszt produktów</span></span><span className="order__price">{productsValue}</span>
              </li>
              <li className="detail__item">
                <span><span>Koszt dostawy</span></span><span className="order__price">{shippingCost}</span>
              </li>
              <li className="detail__item sum">
                <span><span>Łącznie do zapłaty</span></span><span className="order__price">{orderValue ? orderValue : 0}</span>
              </li>
            </ul>
          </div>
          {/* payment methods ---------------------------------------------------------- */}
          <div className="payment">
            <h3>Wybierz formę płatności</h3>
            <ul className="shipping__items">
              <li className="detail__item">
                <span><input type="radio" id='personal' name='payment_method'/>
                <span><label htmlFor="personal">Płatność przy odbiorze</label></span></span>
              </li>
              <li className="detail__item">
                <span><input type="radio" id='transfer' name='payment_method'/>
                <span><label htmlFor="transfer">Przelew tradycyjny</label></span></span>
              </li>
              <li className="detail__item">
                <span><input type="radio" id='payu' name='payment_method'/>
                <span><label htmlFor="payu">Płacę z PayU</label></span></span>
              </li>
            </ul>
            <div className="payments__img">
              <img src=".\assets\PAYU_LOGO_LIME.png" alt="payu" />
              <img src=".\assets\BLIK LOGO RGB.png" alt="blik" />
            </div>
            {/* place order ----------------------------------------------------- */}
            {loginUser || !user.length === 0 || user.auth ? <></> : <>
            <div className="input__line__checkbox">
              <input type="checkbox" id='account-create'/>
              <label htmlFor='account-create'>Chcę założyć konto w trakcie składania zamówienia.</label>
            </div>
            </>}
            <div className="input__line__checkbox">
              <input type="checkbox" id='terms'/>
              <label htmlFor='terms'>Akceptuję regulamin zakupów (konieczne do złożenia zamówienia)</label>
            </div>
            <div className="input__line__checkbox">
              <input type="checkbox" id='data-processing'/>
              <label htmlFor='data-processing'>Wyrażam zgodę na przetwarzanie podanych przeze mnie danych osobowych przez Sklep Online Shop.pl w celu realizacji zamówienia.</label>
            </div>
            <button type='submit' form='order_form' className="btn order__btn" onClick={() => console.log('click')}>Zamawiam i płacę</button>
          </div>
        </div>
      </div>
    </div>
  )
}
