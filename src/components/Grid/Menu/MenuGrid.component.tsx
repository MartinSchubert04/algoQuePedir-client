import type { Plato } from "@domain/Plato"
import { PlatoCard } from "@components/Cards/PlatoCard/PlatoCard.component"
import "./MenuGrid.css"

interface MenuGridProps {
  menu: Plato[]
}

export const MenuGrid = ({ menu }: MenuGridProps) => {
  if (menu.length === 0) {
    return null // No renderizar si no hay platos
  }

  return (
    <div className="menu-grid" data-testid="menu-grid">
      {menu.map((plato: Plato) => (
        <PlatoCard key={plato.id} plato={plato} />
      ))}
    </div>
  )
}
