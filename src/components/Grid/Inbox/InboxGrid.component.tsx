import "./InboxGrid.css"
import { Inbox, Mensaje } from "@domain/Inbox"
import { MensajeCard } from "@components/Cards/MensajeCard/MensajeCard.component"

interface InboxProps {
  inbox: Inbox
}

export const InboxGrid = ({ inbox }: InboxProps) => {
  if (inbox.mensajes.length === 0) {
    return null // No renderizar si no hay platos
  }

  return (
    <div className="inbox-grid" data-testid="inbox-grid">
      {inbox.mensajes.map((m: Mensaje, r: number) => (
        <MensajeCard key={r} mensaje={m} />
      ))}
    </div>
  )
}
