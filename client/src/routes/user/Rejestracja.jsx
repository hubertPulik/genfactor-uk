import { NavLink } from "react-router-dom"

import Logo from "../../components/Logo";
import RegisterForm from "../../components/RegisterForm";

export default function Rejestracja() {
  return (
    <div className="login__page">
      <div className="form__card">
        <Logo />
        <br /> 
        <RegisterForm />
        <br />
        <NavLink to='/'><button className="btn">Wróć do sklepu</button></NavLink>
      </div>
    </div>
  )
}
