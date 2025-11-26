import { Button, ButtonGroup, Typography } from "@mui/material"
import { useState } from "react"
import "./PlatoModal.css"
import type { Plato } from "@domain/Plato"
import { useContext } from "react"
import { Context } from "@context/PedidoContext"

interface PlatoModalProps {
  plato: Plato
  onClose: () => void
}

export const PlatoModal = ({ plato, onClose }: PlatoModalProps) => {
  const [count, setCount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(plato.costo)

  const pedido = useContext(Context)!

  const increase = () => {
    const newCount = count + 1
    setCount(newCount)
    setTotalPrice(plato.costo * newCount)
  }

  const decrease = () => {
    const newCount = count > 1 ? count - 1 : count
    setCount(Math.max(1, newCount))
    setTotalPrice(plato.costo * newCount)
  }

  return (
    <section
      className="plato-modal-backdrop"
      data-testid="modal-test"
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="plato-modal-overlay"
        onClick={(e) => e.stopPropagation()} // <- NO cerrar si toco adentro
      >
        <img src={plato.imagenPlato} className="modal-img" />
        <p className="modal-title">{plato.nombrePlato}</p>
        <p className="modal-text">{plato.descripcion}</p>
        <div className="modal-cost-group">
          <p className="modal-text">Precio unitario</p>
          <p className="modal-text">{plato.costo.toFixed(2)}</p>
        </div>
        <div className="button-group-contador">
          <Button
            variant="contained"
            onClick={() => decrease()}
            sx={{ color: "var(--color-primary)", backgroundColor: "var(--color-text-red)", height: "2rem", width: "2rem" }}
          >
            -
          </Button>
          <p className="modal-count">{count}</p>
          <Button
            variant="contained"
            onClick={() => increase()}
            sx={{ color: "var(--color-primary)", backgroundColor: "var(--color-text-red)", height: "2rem", width: "2rem" }}
          >
            +
          </Button>
        </div>
        <div className="modal-cost-group">
          <p className="modal-text">Precio unitario</p>
          <p className="modal-text">{totalPrice.toFixed(2)}</p>
        </div>
        <div className="modal-footer-buttons">
          <Button
            variant="outlined"
            onClick={() => onClose()}
            sx={{ textTransform: "none", color: "var(--color-text-red)", borderColor: "var(--color-text-red)" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const platoConCantidad = { ...plato, cantidad: count } 
                pedido.addPlato(platoConCantidad)
              onClose()
            }}
            sx={{ textTransform: "none", backgroundColor: "var(--color-text-red)" }}
          >
            Agregar al pedido
          </Button>
        </div>
      </div>
    </section>
  )
}
