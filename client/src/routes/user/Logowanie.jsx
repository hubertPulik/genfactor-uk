import { NavLink } from "react-router-dom"

import Logo from "../../components/Logo";
import LoginForm from "../../components/LoginForm";

export default function Logowanie() {
  return (
    <div className="login__page">
      <div className="form__card">
        <Logo />
        <br /> 
        <LoginForm location={'loginPage'} />
        <br />
        <p>Nie masz jeszcze konta?</p>
        <p><NavLink to='/rejestracja'>Zarejestruj się za darmo!</NavLink></p>
        <br />
        <NavLink to='/'><button className="btn">Wróć do sklepu</button></NavLink>
      </div>
    </div>
  )
}
