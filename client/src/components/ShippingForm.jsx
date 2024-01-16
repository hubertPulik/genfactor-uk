import FormInput from "./FormInput"
import FormSelect from "./FormSelect"

export default function ShippingForm({ register, errors, companyToggle, isCompany }) {

  const countries = [{value: ''}, {name:'Polska', value:'pl'}, {name:'Niemcy', value:'de'}, {name: 'Wielka Brytania', value:'gb'}, {name:'Francja', value:'fr'}, {name:'Irlandia', value:'ir'}]

  const firstName = {name: 'shippingName', label: 'Imię', options: ''}
  const lastName = {name: 'shippingSurname', label: 'Nazwisko', options: ''}
  const companyName = {name: 'shippingCompanyName', label: 'Nazwa Firmy', options: ''}
  const street = {name: 'shippingStreet', label: 'Ulica / Miejscowość', options: ''}
  const addressNumber1 = {name: 'shippingAddressNumber1', label: 'Numer domu / budynku', options: ''}
  const addressNumber2 = {name: 'shippingAddressNumber2', label: 'Numer lokalu / mieszkania', options: ''}
  const zipCode = {name: 'shippingZipCode', label: 'Kod pocztowy', options: ''}
  const city = {name: 'shippingCity', label: 'Miasto / Poczta', options: ''}
  const country = {name: 'shippingCountry', label: 'Kraj', options: countries}
  const phone = {name: 'shippingPhone', label: 'Numer telefonu', options: ''}

  return (
    <div className="order_form">
      <div className="input__line">
        <div className="input__box">
          <FormInput controls={firstName} register={register}/>
          <span className="input__err">{errors.shippingName?.message}</span>
        </div>
        <div className="input__box">
          <FormInput controls={lastName} register={register}/>
          <span className="input__err">{errors.shippingSurname?.message}</span>
        </div>
      </div>
      {isCompany ? <>
        <FormInput controls={companyName} register={register}/>
        <span className="input__err">{errors.shippingCompanyName?.message}</span>
      </> : <></>}
      <FormInput controls={street} register={register}/>
      <span className="input__err">{errors.shippingStreet?.message}</span>
      <div className="input__line">
        <div className="input__box">
          <FormInput controls={addressNumber1} register={register}/>
          <span className="input__err">{errors.shippingAddressNumber1?.message}</span>
        </div>
        <div className="input__box">
          <FormInput controls={addressNumber2} register={register}/>
          <span className="input__err">{errors.shippingAddressNumber2?.message}</span>
        </div>
      </div>
      <div className="input__line">
        <div className="input__box">
          <FormInput controls={zipCode} register={register}/>
          <span className="input__err">{errors.shippingZipCode?.message}</span>
        </div>
        <div className="input__box">
          <FormInput controls={city} register={register}/>
          <span className="input__err">{errors.shippingCity?.message}</span>
        </div>
      </div>
      <FormSelect controls={country} register={register}/>
      <span className="input__err">{errors.shippingCountry?.message}</span>
      <FormInput controls={phone} register={register}/>
      <span className="input__err">{errors.shippingPhone?.message}</span>
    </div>
  )
}
