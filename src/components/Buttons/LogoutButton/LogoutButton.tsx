import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context as UserContext } from "@context/UserContext"
import signOutIcon from "@assets/iconos/sign-out.svg" 
import "./LogoutButton.css"

export const LogoutButton = () => {
  const { logout } = useContext(UserContext)!
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/Login")
  }

  return (
    <button 
      className="logout-btn" 
      onClick={handleLogout} 
      aria-label="Cerrar sesión"
      data-testid="logout-btn"
    >
      <img src={signOutIcon} alt="Cerrar sesión" />
    </button>
  )
}