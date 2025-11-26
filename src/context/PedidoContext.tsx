import { createContext } from "react"
import type { Plato } from "@domain/Plato"

export type PedidoContext = {
  localId: number | null
  platos: Plato[]
  valorTotal: number

  setLocalId: (id: number) => void
  addPlato: (plato: Plato) => void
  removePlato: (idPlato: number) => void
  clearPedido: () => void
}

export const Context = createContext<PedidoContext | null>(null)
