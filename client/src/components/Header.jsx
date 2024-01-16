import { useLocation } from "react-router";

import Icons from "./Icons";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {

  let path = useLocation()

  return (
    <>{path.pathname === '/logowanie' || path.pathname === '/rejestracja' ? <></> :
      <div className="header_box">
        <div className="header_out">
          <Logo />
          <div className="header">
            <Navigation />
            <Icons />
          </div>
        </div>
      </div>
      }
    </>
  )
}
