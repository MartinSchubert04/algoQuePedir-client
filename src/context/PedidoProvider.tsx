import { type ReactNode, useState } from "react"
import { Context } from "./PedidoContext"
import type { Plato } from "@domain/Plato"

export const PedidoProvider = ({ children }: { children: ReactNode }) => {
  const [localId, setLocalId] = useState<number | null>(null)
  const [platos, setPlatos] = useState<Plato[]>([])
  const [valorTotal, setValorTotal] = useState<number>(0)

  const addPlato = (plato: Plato) => {
    setPlatos(prev => {
      const existente = prev.find(p => p.nombrePlato === plato.nombrePlato)

      if (existente) {
        return prev.map(p =>
          p.nombrePlato === plato.nombrePlato
            ? { ...p, cantidad: p.cantidad + plato.cantidad }
            : p
        )
      }
      return [...prev, plato]
    })

    setValorTotal(prev => prev + plato.costo * plato.cantidad)
  }


  const removePlato = (platoId: number) => {
    setPlatos((prev) => prev.filter((p) => p.id !== platoId))
    const platoEliminado = platos.find((p) => p.id === platoId)
    if (platoEliminado) {
      setValorTotal((prev) => prev - platoEliminado.costo)
    }
  }

  const clearPedido = () => {
    setPlatos([])
    setValorTotal(0)
    setLocalId(null)
  }

  const value = {
    localId,
    platos,
    valorTotal,

    setLocalId,
    addPlato,
    removePlato,
    clearPedido,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
