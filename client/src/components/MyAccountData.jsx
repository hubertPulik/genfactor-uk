import { useState, useEffect } from 'react'
import Axios from "axios" 

import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { defaultShema, shippingUpdateShema, shippingCompanyUpdateShema } from '../controllers/ValidationShemas'

export default function MyAccountData(user) {

  const [ isCompany, setIsCompany ] = useState(false)
  const [ combinedShema, setCombinedShema ] = useState(defaultShema)
  const [ userData, setUserData ] = useState({})

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
    if(user && user.user.billingAddress) {
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
 
  const updateData = (data) => {
    if (isCompany) {
      const dataSet = {...data}
      Axios.post(`http://localhost:3001/api/userdata/${user.user.id}`, {
        dataSet
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    } else if (!isCompany) {
      const dataSet = {...data, companyName: null, shippingCompanyName: null, taxNumber: null}
      Axios.post(`http://localhost:3001/api/userdata/${user.user.id}`, {
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
      Axios.post(`http://localhost:3001/api/userdata-create/${user.user.id}`, {
        dataSet
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    } else if (!isCompany) {
      const dataSet = {...data, companyName: null, shippingCompanyName: null, taxNumber: null}
      console.log(dataSet)
      Axios.post(`http://localhost:3001/api/userdata-create/${user.user.id}`, {
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
    <div className="myAccount__data">
      <form action="" id='data_form' className="order__form data__form" onSubmit={handleSubmit(user.user.billingAddress ? updateData : saveData, showError)}>
        <div className="order__left">
          <h3>Adres rozliczeniowy</h3>
          <BillingForm register={register} errors={errors} companyToggle={companyToggle} isCompany={isCompany} location={'myAccount'}/>
        </div>
        <div className="order__right">
          <h3>Adres do wysyłki</h3>
          <ShippingForm register={register} errors={errors} isCompany={isCompany} />
          {!isCompany ? <></> : <></>}
          <button type='submit' form='data_form' className="btn order__btn">Zaktualizuj</button>
        </div>
      </form>
    </div>
  )
}
