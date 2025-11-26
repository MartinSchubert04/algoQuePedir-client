import "./LocalGrid.css"
import { LocalCard } from "@components/Cards/LocalCard/LocalCard.component"
import type { LocalSearch } from "@domain/Local"

export default function LocalGrid({ locales }: { locales: LocalSearch[] }) {
  return (
    <div className="local-grid" data-testid="local-grid">
      {locales.map((local) => (
        <LocalCard key={local.id} {...local} />
      ))}
    </div>
  )
}
