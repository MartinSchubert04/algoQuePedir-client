import type { Plato } from "@domain/Plato" // Ajusta la ruta si es necesario
import "./PlatoCard.css"
import { PlatoModal } from "@components/Modal/Plato/PlatoModal.component"
import { useState } from "react"
import { setModalOpen } from "@utils/modalEvents"
import { imgNotFound } from "@assets/index"

interface PlatoCardProps {
  plato: Plato
}

export const PlatoCard = ({ plato }: PlatoCardProps) => {
  const [selectedPlato, setSelectedPlato] = useState<Plato | null>(null)

  return (
    <>
      <div className="plato-card-container" data-testid="plato-card">
        <div
          className="plato-content-container"
          onClick={() => {
            setModalOpen(true)
            setSelectedPlato(plato)
          }}
        >
          <div className="plato-content">
            <p className="plato-name">{plato.nombrePlato}</p>
            <p className="plato-description">{plato.descripcion}</p>
            <p className="plato-cost">{"$" + plato.costo.toFixed(2)}</p>
          </div>
          <img className="plato-img" src={plato.imagenPlato ? plato.imagenPlato : imgNotFound} alt={plato.nombrePlato} />
        </div>
      </div>

      {selectedPlato && (
        <PlatoModal
          plato={selectedPlato}
          onClose={() => {
            setModalOpen(false)
            setSelectedPlato(null)
          }}
        />
      )}
    </>
  )
}
