import { useState } from "react"
import { useNavigate } from "react-router"
import Axios from "axios"

import { useDispatchUser } from '../controllers/UserContext'

export default function LoginForm({location, action}) {

  const [ useremail, setUseremail ] = useState('')
  const [ password, setPassword ] = useState('')
  // const [ err, setErr ] = useState()
  const dispatch = useDispatchUser()

  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:3001/api/login', {
      email: useremail,
      password: password
    }, {
      baseURL: 'http://localhost:3001/api',
      withCredentials: true
    }).then((response) => {
      const authObject = {
        auth: true,
        user: response.data.user,
        token: response.data.token
      }
      dispatch({ type: "CREATE", authObject })
      if (location === 'loginPage') {
        navigate('/moje-konto')
      } else {
        action()
        return authObject
      }
    }).catch((err) => {
      console.log(err)
    })
  };

  return (
    <div className={location}>
      <form action="/" className="form">
        <div className="login__box">
          <div>
            <label htmlFor="email">Twój email</label>
            <input type="text" id="email" name="email" onChange={(e) => {setUseremail(e.target.value)}}/>
          </div>
          <div>
            <label htmlFor="password">Twoje hasło</label>
            <input type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
          </div>
        </div>
        <button type="submit" className="btn" onClick={(e) => {login(e)}}>Zaloguj się</button>
      </form>
      <p>Nie pamiętasz hasła? Zresetuj je <strong>tutaj</strong>.</p>
    </div>
  )
}
