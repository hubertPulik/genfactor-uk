import { string, z } from 'zod'

const defaultShema = z.object({
  email: string().email({ message: "Podaj poprawny adres email" }),
  repeatEmail: string().email(),
  name: string().min(1, { message: "Pole jest wymagane" }),
  surname: string().min(1, { message: "Pole jest wymagane" }),
  street: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber2: string().optional(),
  city: string().min(1, { message: "Pole jest wymagane" }),
  zipCode: string().min(1, { message: "Pole jest wymagane" }),
  country: string().min(1, { message: "Pole jest wymagane" }),
  phone: string().min(1, { message: "Pole jest wymagane" }),
  orderInfo: string().optional()
})

const shippingShema = z.object({
  email: string().email({ message: "Podaj poprawny adres email" }),
  repeatEmail: string().email(),
  name: string().min(1, { message: "Pole jest wymagane" }),
  surname: string().min(1, { message: "Pole jest wymagane" }),
  street: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber2: string().optional(),
  city: string().min(1, { message: "Pole jest wymagane" }),
  zipCode: string().min(1, { message: "Pole jest wymagane" }),
  country: string().min(1, { message: "Pole jest wymagane" }),
  phone: string().min(1, { message: "Pole jest wymagane" }),
  orderInfo: string().optional(),
  shippingName: string().min(1, { message: "Pole jest wymagane" }),
  shippingSurname: string().min(1, { message: "Pole jest wymagane" }),
  shippingStreet: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber2: string().optional(),
  shippingCity: string().min(1, { message: "Pole jest wymagane" }),
  shippingZipCode: string().min(1, { message: "Pole jest wymagane" }),
  shippingCountry: string().min(1, { message: "Pole jest wymagane" }),
  shippingPhone: string().min(1, { message: "Pole jest wymagane" })
})

const companyShema = z.object({
  email: string().email({ message: "Podaj poprawny adres email" }),
  repeatEmail: string().email(),
  name: string().min(1, { message: "Pole jest wymagane" }),
  surname: string().min(1, { message: "Pole jest wymagane" }),
  companyName: string().min(1, { message: "Pole jest wymagane" }),
  taxNumber: string().min(1, { message: "Pole jest wymagane" }),
  street: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber2: string().optional(),
  city: string().min(1, { message: "Pole jest wymagane" }),
  zipCode: string().min(1, { message: "Pole jest wymagane" }),
  country: string().min(1, { message: "Pole jest wymagane" }),
  phone: string().min(1, { message: "Pole jest wymagane" }),
  orderInfo: string().optional(),
})

const shippingCompanyShema = z.object({
  email: string().email({ message: "Podaj poprawny adres email" }),
  repeatEmail: string().email(),
  name: string().min(1, { message: "Pole jest wymagane" }),
  surname: string().min(1, { message: "Pole jest wymagane" }),
  companyName: string().min(1, { message: "Pole jest wymagane" }),
  taxNumber: string().min(1, { message: "Pole jest wymagane" }),
  street: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber2: string().optional(),
  city: string().min(1, { message: "Pole jest wymagane" }),
  zipCode: string().min(1, { message: "Pole jest wymagane" }),
  country: string().min(1, { message: "Pole jest wymagane" }),
  phone: string().min(1, { message: "Pole jest wymagane" }),
  orderInfo: string().optional(),
  shippingName: string().min(1, { message: "Pole jest wymagane" }),
  shippingSurname: string().min(1, { message: "Pole jest wymagane" }),
  shippingCompanyName: string().optional(),
  shippingStreet: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber2: string().optional(),
  shippingCity: string().min(1, { message: "Pole jest wymagane" }),
  shippingZipCode: string().min(1, { message: "Pole jest wymagane" }),
  shippingCountry: string().min(1, { message: "Pole jest wymagane" }),
  shippingPhone: string().min(1, { message: "Pole jest wymagane" }),
})

const shippingCompanyUpdateShema = z.object({
  name: string().min(1, { message: "Pole jest wymagane" }),
  surname: string().min(1, { message: "Pole jest wymagane" }),
  companyName: string().min(1, { message: "Pole jest wymagane" }),
  taxNumber: string().min(1, { message: "Pole jest wymagane" }),
  street: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber2: string().optional(),
  city: string().min(1, { message: "Pole jest wymagane" }),
  zipCode: string().min(1, { message: "Pole jest wymagane" }),
  country: string().min(1, { message: "Pole jest wymagane" }),
  phone: string().min(1, { message: "Pole jest wymagane" }),
  orderInfo: string().optional(),
  shippingName: string().min(1, { message: "Pole jest wymagane" }),
  shippingSurname: string().min(1, { message: "Pole jest wymagane" }),
  shippingCompanyName: string().optional(),
  shippingStreet: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber2: string().optional(),
  shippingCity: string().min(1, { message: "Pole jest wymagane" }),
  shippingZipCode: string().min(1, { message: "Pole jest wymagane" }),
  shippingCountry: string().min(1, { message: "Pole jest wymagane" }),
  shippingPhone: string().min(1, { message: "Pole jest wymagane" }),
})

const shippingUpdateShema = z.object({
  name: string().min(1, { message: "Pole jest wymagane" }),
  surname: string().min(1, { message: "Pole jest wymagane" }),
  street: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  addressNumber2: string().optional(),
  city: string().min(1, { message: "Pole jest wymagane" }),
  zipCode: string().min(1, { message: "Pole jest wymagane" }),
  country: string().min(1, { message: "Pole jest wymagane" }),
  phone: string().min(1, { message: "Pole jest wymagane" }),
  orderInfo: string().optional(),
  shippingName: string().min(1, { message: "Pole jest wymagane" }),
  shippingSurname: string().min(1, { message: "Pole jest wymagane" }),
  shippingStreet: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber1: string().min(1, { message: "Pole jest wymagane" }),
  shippingAddressNumber2: string().optional(),
  shippingCity: string().min(1, { message: "Pole jest wymagane" }),
  shippingZipCode: string().min(1, { message: "Pole jest wymagane" }),
  shippingCountry: string().min(1, { message: "Pole jest wymagane" }),
  shippingPhone: string().min(1, { message: "Pole jest wymagane" }),
})

export { companyShema, defaultShema, shippingShema, shippingCompanyShema, shippingCompanyUpdateShema, shippingUpdateShema }