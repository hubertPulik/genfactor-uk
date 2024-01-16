import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'
import { useForm } from 'react-hook-form'
import Axios from "axios" 
import FormInput from './FormInput'

export default function MyAccoutnUser({ user }) {

  const [ message, setMessage ] = useState('')

  const shema = z
    .object({
      oldPassword: string(),
      newPassword: string({ message: "Podaj poprawny adres email" }),
      repeatPassword: string({ message: "Hasła nie są takie same" })
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
      message: "Nowe Hasła nie są takie same",
      path: ["repeatPassword"],
  });

  const { register, handleSubmit, formState, reset } = useForm({ resolver: zodResolver(shema)});

  const { errors } = formState

  const oldPassword = {name: 'oldPassword', label: 'Stare hasło', options: ''}
  const newPassword = {name: 'newPassword', label: 'Nowe hasło', options: ''}
  const repeatPassword = {name: 'repeatPassword', label: 'Powtórz nowe hasło', options: ''}

  const submitChange = (data) => {
    console.log(data)
    Axios.post(`http://localhost:3001/api/userupdate/${user.id}`, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      email: user.email
    }, {
      baseURL: 'http://localhost:3001/api',
      withCredentials: true
    }).then((response) => {
      console.log(response)
      setMessage(response.data)
    })
  }

  return (
    <div className="myAccount__user">
      <div className='account__email__left p'>
        <div>Twój adres email:</div>
        <div><strong>{user.email}</strong></div>
      </div>
      <div className='p'>Adres email jest przypisany do konta na stałe i nie można go zmnieć.</div>
      <div className='p'>Jeśli chcesz zmienić adres email, możesz skorzysatć z formularza poniżej.</div>
      <form action="" className='p' onSubmit={handleSubmit(submitChange)}>
        <div className='account__email'>
          <FormInput register={register} controls={oldPassword}/>
          <FormInput register={register} controls={newPassword}/>
          <FormInput register={register} controls={repeatPassword}/>
          <button type='submit'>Zapisz hasło</button>
        </div>
        <div className='p errors'>
          <span className="input__err">{errors.repeatPassword?.message}</span>
          <span className="input__err">{errors.newPassword?.message}</span>
          <span className="input__err">
            {message === 'Podane hasło jest nieprawidłowe' ? <p style={ {color: 'red'} }>{message}</p> : <></>}
          </span>
          <span className="input__err">
            {message === 'Hasło zostało zaktualziowane' ? <p style={ {color: 'green'} }>{message}</p> : <></>}
          </span>
        </div>
      </form>
     
      <div className='p'>Jesśli nie pamiętasz swojego hasła możesz je zresetować klikając w link poniżej:</div>
    </div>
  )
}
