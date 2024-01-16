import { useState } from "react"
import Axios from "axios"

export default function RegisterForm() {

  const [ useremailReg, setUseremailReg ] = useState('')
  const [ passwordReg, setPasswordReg ] = useState('')

  const register = () => {
    Axios.post('http://localhost:3001/api/register', {
      email: useremailReg,
      password: passwordReg
    }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  };

  return (
    <div>
      <form action="/" className="form"> 
          <input type="text" id="email" name="email" onChange={(e) => {setUseremailReg(e.target.value)}}/>
          {/* <input type="text" id="confirm-email" name="confirm-email" value="Powtórz Twój email" /> */}
          <input type="text" id="password" name="password" onChange={(e) => {setPasswordReg(e.target.value)}}/>
          {/* <input type="text" id="confirm-password" name="confirm-password" value="Powtórz Twoje hasło" /> */}
          <button type="submit" className="btn" onClick={() => {register()}}>Zarejestruj się</button>
        </form>
        <br />
        <p>Rejestrując się w naszym sklepie oświadczasz równocześnie, że zapoznałeś/-aś się z warunkami świadczenia usług i regulaminem, który możesz znaleźć tutaj:</p><p><strong>Regulamin i polityka prywatności</strong></p>
    </div>
  )
}
