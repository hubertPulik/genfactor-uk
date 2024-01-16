import { useState, useEffect } from "react";
import Axios from "axios"

import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultShema, shippingUpdateShema, shippingCompanyUpdateShema } from '../controllers/ValidationShemas'

export default function AdminUser({user, viewUser}) {

  const [ isCompany, setIsCompany ] = useState(false)
  const [ combinedShema, setCombinedShema ] = useState(defaultShema)
  const [ userData, setUserData ] = useState({})
  const [ b, setB ] = useState()
  const [ s, setS ] = useState()
  const [ isPennding, setIsPennding ] = useState(true)
  const [ err, setErr ] = useState()

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/admin/users/${user.id}`)
      .then(res => {
        setB(res.data.userData.billingAddress)
        setS(res.data.userData.shippingAddress)
        setIsPennding(false);
        setErr(null);
      })
      .catch(err => {
        console.log(err)
        setIsPennding(false);
        setErr(err.message);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
   if (isCompany) {
      setCombinedShema(shippingCompanyUpdateShema)
    } else { 
      setCombinedShema(shippingUpdateShema)
    } 
  }, [isCompany])

  const { register, handleSubmit, formState, reset } = useForm({ resolver: zodResolver(combinedShema)});

  const { errors } = formState

  useEffect(() => {
    if(!isPennding && b) {
      const data = {
        ...b, email: user.email, repeatEmail: user.email, shippingName: s.name, shippingSurname: s.surname, shippingCopanyName: s.companyName, shippingStreet: s.street, shippingAddressNumber1: s.addressNumber1, shippingAddressNumber2: s.addressNumber2, shippingZipCode: s.zipCode, shippingCity: s.city, shippingCountry: s.country, shippingPhone: s.phone}
      setUserData(data)
      reset({...data})
      console.log(userData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPennding])

  useEffect(() => {
    reset({...userData})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPennding])
 
  const updateData = (data) => {
    console.log('update')
    if (isCompany) {
      const dataSet = {...data}
      console.log(dataSet)
      Axios.post(`http://localhost:3001/api/userdata/${user.id}`, {
        dataSet
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    } else if (!isCompany) {
      const dataSet = {...data, companyName: null, shippingCompanyName: null, taxNumber: null}
      console.log(dataSet)
      Axios.post(`http://localhost:3001/api/userdata/${user.id}`, {
        dataSet
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const saveData = (data) => {
    console.log('update')
    if (isCompany) {
      const dataSet = {...data}
      console.log(dataSet)
      Axios.post(`http://localhost:3001/api/userdata-create/${user.id}`, {
        dataSet
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    } else if (!isCompany) {
      const dataSet = {...data, companyName: null, shippingCompanyName: null, taxNumber: null}
      console.log(dataSet)
      Axios.post(`http://localhost:3001/api/userdata-create/${user.id}`, {
        dataSet
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const showError = (errors) => {
    console.log(errors)
  }

  const companyToggle = (e) => {
    setIsCompany(prevIsCompany => !prevIsCompany)
  }

  return (
    <>
      {err ? <div>{err}</div> : <></>}
      {isPennding ? <></> : 
      <div>
        <div className="userDetails">
          <div>
            <div>Imię i nazwisko: {b ? <span>{b.name} {b.surname}</span> : <></>}</div>
            <div>Email użytkownika <span>{user.email}</span></div>
          </div>
          <div>
            <div>Id użytkownika <span>#{user.id}</span></div>
            <div>Data rejestracji: <span>{(new Date(user.timestamp)).toLocaleDateString('ISO', { day:"numeric",  month:"short", year:"numeric" })}</span></div>
            <div>Typ użytkownika: <span className={`type_${user.type}`}></span></div>
          </div>
        </div>
        <div className="userEdit__form">
          <form action="" id='user_form' className="order__form" onSubmit={handleSubmit(b ? updateData : saveData, showError)}>
          <div className="order__left">
            <h3 className="marginTop">Dane płatności</h3>
            <BillingForm register={register} errors={errors} companyToggle={companyToggle} isCompany={isCompany} location={'userPage'}/>
          </div>
          <div className="order__right">
          <h3 className="marginTop">Dane wysyłki</h3>
            <ShippingForm register={register} errors={errors} isCompany={isCompany} />
          </div>
          <button type='submit' className="btn order__btn">Zaktualizuj dane</button>
          </form>
        </div>

      </div>}
      <div className="marginTop"></div>
      <button className="btn marginTop" onClick={() => viewUser(null, false)}>
      Wróć do listy użytkowników
      </button>
    </>
  )
}
