import "./MensajeCard.css"
import { Mensaje } from "@domain/Inbox"

interface MensajeCardProps {
  mensaje: Mensaje
}

export const MensajeCard = ({ mensaje }: MensajeCardProps) => {
  return (
    <>
      <div className="mensaje-card-container" data-testid="mensaje-card">
        <div className="mensaje-content">
          <div className="mensaje-header">
            <p className="mensaje-name">{mensaje.asunto}</p>
            <p className="mensaje-cost">{new Date(mensaje.fecha).toLocaleDateString("es-AR")}</p>
          </div>
          <p className="mensaje-description">{mensaje.contenido}</p>
        </div>
      </div>
    </>
  )
}
