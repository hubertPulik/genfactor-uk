import FormInput from "./FormInput"
import FormSelect from "./FormSelect"

export default function BillingForm({ register, errors, companyToggle, isCompany, location }) {

  const countries = [{value: ''}, {name:'Polska', value:'pl'}, {name:'Niemcy', value:'de'}, {name: 'Wielka Brytania', value:'gb'}, {name:'Francja', value:'fr'}, {name:'Irlandia', value:'ir'}]

  const email = {name: 'email', label: 'Adres email', options: ''}
  const repeatEmail = {name: 'repeatEmail', label: 'Powtórz adres email', options: ''}
  const firstName = {name: 'name', label: 'Imię', options: ''}
  const lastName = {name: 'surname', label: 'Nazwisko', options: ''}
  const companyName = {name: 'companyName', label: 'Nazwa Firmy', options: ''}
  const taxNumber = {name: 'taxNumber', label: 'NIP', options: ''}
  const street = {name: 'street', label: 'Ulica / Miejscowość', options: ''}
  const addressNumber1 = {name: 'addressNumber1', label: 'Numer domu / budynku', options: ''}
  const addressNumber2 = {name: 'addressNumber2', label: 'Numer lokalu / mieszkania', options: ''}
  const zipCode = {name: 'zipCode', label: 'Kod pocztowy', options: ''}
  const city = {name: 'city', label: 'Miasto / Poczta', options: ''}
  const country = {name: 'country', label: 'Kraj', options: countries}
  const phone = {name: 'phone', label: 'Numer telefonu', options: ''}

  return (
    <div className="order_form">
      {location === 'orderPage' ? 
        <>
          <FormInput controls={email} register={register}/>
          <span className="input__err">{errors.email?.message}</span>
          <FormInput controls={repeatEmail} register={register}/>
          <span className="input__err">{errors.repeatEmail?.message}</span>
        </>
      : <></>}
      <div className="input__line">
        <div className="input__box">
          <FormInput controls={firstName} register={register}/>
          <span className="input__err">{errors.name?.message}</span>
        </div>
        <div className="input__box">
          <FormInput controls={lastName} register={register}/>
          <span className="input__err">{errors.surname?.message}</span>
        </div>
      </div>
      {location !== 'userPage' ?
      <div className="input__line__checkbox">
        <input type="checkbox" name="is_company" id="is_company" {...register("is_company")} onChange={companyToggle}/>
        <label htmlFor="is_company">Chcę otrzymać fakturę vat</label>
      </div> : <></>}
      {location === 'userPage' ?
      <div className="input__line__checkbox">
        <input type="checkbox" name="is_company" id="is_company" {...register("is_company")} onChange={companyToggle}/>
        <label htmlFor="is_company">Klient instytucjonalny</label>
      </div> : <></>}
      {isCompany ? <>
        <FormInput controls={companyName} register={register}/>
        <span className="input__err">{errors.companyName?.message}</span>
        <FormInput controls={taxNumber} register={register}/>
        <span className="input__err">{errors.taxNumber?.message}</span>
      </> : <></>}
      <FormInput controls={street} register={register}/>
      <span className="input__err">{errors.street?.message}</span>
      <div className="input__line">
        <div className="input__box">
          <FormInput controls={addressNumber1} register={register}/>
          <span className="input__err">{errors.addressNumber1?.message}</span>
        </div>
        <div className="input__box">
          <FormInput controls={addressNumber2} register={register}/>
          <span className="input__err">{errors.addressNumber2?.message}</span>
        </div>
      </div>
      <div className="input__line">
        <div className="input__box">
          <FormInput controls={zipCode} register={register}/>
          <span className="input__err">{errors.zipCode?.message}</span>
        </div>
        <div className="input__box">
          <FormInput controls={city} register={register}/>
          <span className="input__err">{errors.city?.message}</span>
        </div>
      </div>
      <FormSelect controls={country} register={register}/>
      <span className="input__err">{errors.country?.message}</span>
      <FormInput controls={phone} register={register}/>
      <span className="input__err">{errors.phone?.message}</span>
      {location === 'orderPage' ? 
        <>
          <div className="form__input">
            <label htmlFor="orderInfo">Uwagi do zamówienia</label>
            <textarea name="orderInfo" id="orderInfo" cols="30" rows="10" {...register("orderInfo")}></textarea>
          </div>
        </>
      : <></>}
    </div>
  )
}
