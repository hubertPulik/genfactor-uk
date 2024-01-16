import { useReducer, useContext, createContext, useEffect } from "react";

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch(action.type) {
    case "ADD":
      let newState = [];
      if (state.length === 0) {
        newState = [action.item]
        // console.log('pierwszy produkt')
      } else if (state.length === 1 && (state.filter(i => i.productId === action.item.productId)).length === 1) {
          const filteredState = state.filter(i => i.productId !== action.item.productId)
          const filteredItem = state.filter(i => i.productId === action.item.productId)[0]
          const updateItem = { ...filteredItem, quantity: filteredItem.quantity + action.item.quantity }
          newState = [...filteredState, updateItem]
          newState.sort((s1, s2) => {
            return s1.productId - s2.productId;
          });
          // console.log('w koszyku jest tylko taki sam produkt')
      } else if (state.length > 1 && (state.filter(i => i.productId === action.item.productId)).length === 1) {
          const filteredState = state.filter(i => i.productId !== action.item.productId)
          const filteredItem = state.filter(i => i.productId === action.item.productId)[0]
          const updateItem = { ...filteredItem, quantity: filteredItem.quantity + action.item.quantity }
          newState = [...filteredState, updateItem]
          newState.sort((s1, s2) => {
            return s1.productId - s2.productId;
          });
          // console.log('w koszyku są różne produkty, a produkt dodawany już w nim jest')
      } else {
          newState = [...state, action.item]
          newState.sort((s1, s2) => {
            return s1.productId - s2.productId;
          });
          // console.log('w koszyku są różne produkty, a produkt dodawany jest nowy')
      }
      console.log('first')
      localStorage.removeItem("userCart")
      localStorage.setItem("userCart", JSON.stringify([...newState]))
      return [...newState]
    case "DELETE":
      const filteredState = state.filter(i => i.productId !== action.item)
      localStorage.removeItem("userCart")
      localStorage.setItem("userCart", JSON.stringify([...filteredState]))
      return [...filteredState]
    case "INCREASE":
      let newState2 = [];
      const filteredProducts = state.filter(i => i.productId !== action.item.productId)
      const filteredItem = state.filter(i => i.productId === action.item.productId)[0]
      newState2 = [...filteredProducts, {...filteredItem, quantity: filteredItem.quantity + 1}]
      newState2.sort((s1, s2) => {
        return s1.productId - s2.productId;
      });
      localStorage.removeItem("userCart")
      localStorage.setItem("userCart", JSON.stringify([...newState2]))
      return [...newState2]
    case "DECREASE":
      let newState3 = [];
      const filteredProducts2 = state.filter(i => i.productId !== action.item.productId)
      const filteredItem2 = state.filter(i => i.productId === action.item.productId)[0]
      newState3 = [...filteredProducts2, {...filteredItem2, quantity: filteredItem2.quantity - 1}]
      newState3.sort((s1, s2) => {
        return s1.productId - s2.productId;
      });
      localStorage.removeItem("userCart")
      localStorage.setItem("userCart", JSON.stringify([...newState3]))
      return [...newState3]
    case "READ":
      let readState = []
      if (localStorage.getItem('userCart')) {
        readState = JSON.parse(localStorage.getItem('userCart'))
      }
      return [...readState]
    default:
        throw new Error(`unknown action ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "READ" })
  }, [])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)