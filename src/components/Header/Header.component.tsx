import { useNavigate } from "react-router-dom"
import "./Header.css"
import { arrow } from "@assets/index"

interface HeaderLocalProps {
  title: string
}

export const Header = ({ title }: HeaderLocalProps) => {
  const navigate = useNavigate()

  return (
    <header className="page-header" data-testid="header">
      <button onClick={() => navigate(-1)} className="arrow-icon-container">
        <img src={arrow} className="arrow-icon" />
      </button>
      <p className="page-header-title">{title}</p>
    </header>
  )
}
