import type { PedidoDTO } from "@domain/Pedido"
import { Clock, XCircle } from "@phosphor-icons/react"
import "./PedidoCard.css"

interface PedidoCardProps {
  pedido: PedidoDTO
  onCancel?: () => void
  onClick?: () => void
}

export const PedidoCard = ({ pedido, onCancel, onClick }: PedidoCardProps) => {
  return (
    <div className={`pedido-card pedido-${pedido.estado.toLowerCase()}`} onClick={onClick}>
      <img src={pedido.fotoLocal} alt={pedido.nombreLocal} className="pedido-foto" />

      <div className="pedido-info">
        <div className="pedido-header">
          <h3 className="pedido-nombre">{pedido.nombreLocal}</h3>
        </div>

        <div className="pedido-detalle">
          <span className="pedido-icono">
            <Clock size={18} />
            {pedido.fecha}
          </span>

          {pedido.estado === "PENDIENTE" && (
            <button
              className="pedido-cancelar-btn"
              aria-label="Cancelar pedido"
                onClick={(e) => {
                  e.stopPropagation(); 
                  onCancel?.();
                }}
            >
              <XCircle size={28} weight="fill" />
            </button>
          )}
        </div>

        <div className="pedido-footer">
          <p className="pedido-total">
            Total: <strong>${pedido.total}</strong>
          </p>
          <p className="pedido-items">
            {pedido.items} {pedido.items === 1 ? "artículo" : "artículos"}
          </p>
        </div>
      </div>
    </div>
  )
}

