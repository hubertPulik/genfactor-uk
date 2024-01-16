import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useUser } from "./UserContext";

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

  const user = useUser()

  const [ authState, setAuthState ] = useState(false);

  const token = user.token
  
  const currentTime = Date.now()

  const validate = () => {
    axios.get('http://localhost:3001/api/validation', {
      headers: {
        "x-access-token" : token
      }
    })
    .then((response) => {
      sessionStorage.clear()
      setAuthState(false)
      // console.log(authState)
    }).catch((err) => {
      console.log(err)
    })
  };

  useEffect(() => {
    if (token) {
      const decodedToken = token ? jwt_decode(token) : null
      if (decodedToken.exp * 1000 < currentTime) {
        validate()
      } else {
        setAuthState(true)
      }
    } else {
      setAuthState(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  return (
      <AuthContext.Provider value={authState}>
        {children}
      </AuthContext.Provider>
  )
}