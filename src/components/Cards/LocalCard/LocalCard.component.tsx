import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { LocalSearch } from "domain/Local"
import "./LocalCard.css"

export function LocalCard({ id, nombreLocal, imgURL, calle, altura }: LocalSearch) {
  const navigate = useNavigate()

  const redirecTo = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/Local/${id}`)
    }
  }
  return (
    <div className="card-container" data-testid="local-card" onClick={() => redirecTo(id)}>
      <div className="img-container-local">
        <img className="local-img" src={imgURL} alt={nombreLocal} />
      </div>
      <div className="card-content">
        <Typography fontWeight="bold">{nombreLocal}</Typography>
        <Typography variant="body2" color="text.secondary">
          {calle + ", " + altura}
        </Typography>
      </div>
    </div>
  )
}
