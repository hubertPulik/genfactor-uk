
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

export default function Quantity({ handleQuantityChange, children }) {

  return (
    <div className="quantity">
      <button>
        {children === 1 ? <FiMinusCircle className="quantity__icon"/> : <FiMinusCircle className="quantity__icon" onClick={() => handleQuantityChange('minus')}/>}
      </button>
      <div className="quantity__value">{children}</div>
      <button><FiPlusCircle className="quantity__icon" onClick={() => handleQuantityChange('plus')}/></button>
    </div>
  )
}
