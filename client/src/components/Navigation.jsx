import { NavLink } from "react-router-dom"

export default function Navigation() {
	return(
		<div className="navigation">
      <ul className="navigation__list">
        <li key='1'><NavLink to='/'>Satrt</NavLink></li>
        <li key='2'><NavLink to='/thermography'>Termografia</NavLink></li>
        <li key='3'><NavLink to='/shop'>Shop</NavLink></li>
        <li key='4'><NavLink to='/courses'>Courses</NavLink></li>
        <li key='5'><NavLink to='/contact'>Contakt</NavLink></li>
		  </ul>
    </div>
	)
}