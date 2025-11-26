import "@styles/global.css"
import "./Nav-bar.css"
import { NavLink } from "react-router-dom"
import IconoCasa from "@assets/iconos/house.svg?react"
import IconoPedido from "@assets/iconos/receipt.svg?react"
import IconoEstrella from "@assets/iconos/star.svg?react"
import IconoUsuario from "@assets/iconos/user.svg?react"

export const NavBar = () => {
  return (
    <>
      <header>
        <input type="checkbox" id="menu-checkbox" className="menu-checkbox" style={{ display: "none", zIndex: "1000" }} />
        <nav>
          <div className="nav">
            <NavLink to="/Home" className="nav-bar-link">
              <IconoCasa></IconoCasa>
              <span>Inicio</span>
            </NavLink>
            <NavLink to="/Pedidos" className="nav-bar-link">
              <IconoPedido></IconoPedido>
              <span>Pedidos</span>
            </NavLink>
            <NavLink to="/Calificar" className="nav-bar-link">
              <IconoEstrella></IconoEstrella>
              <span>Calificar</span>
            </NavLink>
            <NavLink to="/Perfil" className="nav-bar-link">
              <IconoUsuario></IconoUsuario>
              <span>Perfil</span>
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  )
}
