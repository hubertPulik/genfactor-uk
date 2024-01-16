import { useContext, useReducer, createContext, useEffect } from "react";

const UserStateContext = createContext()
const UserDispatchContext = createContext()

const reducer = (state, action) => {
  switch(action.type) {
    case "CREATE":
      sessionStorage.setItem('userId', action.authObject.user.id)
      sessionStorage.setItem('userEmail', action.authObject.user.email)
      sessionStorage.setItem("auth", action.authObject.auth)
      sessionStorage.setItem("token", action.authObject.token)
      sessionStorage.setItem("billingAddress", JSON.stringify(action.authObject.user.billingAddress))
      sessionStorage.setItem("shippingAddress", JSON.stringify(action.authObject.user.shippingAddress))
      return action.authObject
    case "READ":
      let authObject
      if (!state.user) {
        authObject = {
          auth: sessionStorage.getItem("auth"),
          token: sessionStorage.getItem("token"),
          user: {
            id: sessionStorage.getItem("userId"),
            email: sessionStorage.getItem("userEmail"),
            billingAddress: JSON.parse(sessionStorage.getItem("billingAddress")),
            shippingAddress: JSON.parse(sessionStorage.getItem("shippingAddress"))
          }
        }
      } else {
        authObject = {...state}
      }
      return authObject
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

export function UserProvider ({ children }) {

  const [ state, dispatch ] = useReducer(reducer, []);
  // const { billingAdress, isPennding, err } = useGetData(`/api/billing/${state.user.id}`)

  useEffect(() => {
    dispatch({ type: "READ" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserDispatchContext.Provider value={dispatch}>
       <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  )
  
}

export function useUser() {
  return useContext(UserStateContext)
}

export function useDispatchUser() {
  return useContext(UserDispatchContext)
}