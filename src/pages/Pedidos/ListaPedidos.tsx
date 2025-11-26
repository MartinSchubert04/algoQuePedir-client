import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PedidoCard } from "../../components/Cards/PedidoCard/PedidoCard"
import { detalleService } from "../../service/detalleService"
import type { PedidoDTO } from "../../domain/Pedido"
import "./listaPedidos.css"
import { showSuccess, showError } from "@utils/errorHandling"
import { Context } from "@context/UserContext"

export const ListaPedidos = () => {
  const [filtro, setFiltro] = useState<"PENDIENTE" | "ENTREGADO" | "CANCELADO">("PENDIENTE")
  const [pedidos, setPedidos] = useState<PedidoDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const username = useContext(Context)?.username!

  // useEffect(() => { //si no encuentro usuario logueado, lo mando al login
  //   if (!username) {
  //     navigate("/login")
  //   }
  // }, [username, navigate])

  const fetchPedidos = async () => {
    try {
      setLoading(true)
      setError(null)

      const pedidos = await detalleService.getAllPedidos(username, filtro)
      setPedidos(pedidos)
    } catch (e) {
      showError("No se pudieron cargar los pedidos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (username) {
      fetchPedidos()
    }
  }, [filtro, username])

  const cancelar = async (pedido: PedidoDTO) => {
    try {
      await detalleService.cancelarPedido(username, pedido)
      await fetchPedidos()
      showSuccess("Pedido cancelado correctamente")
    } catch (error) {
      showError(error)
    }
  }

  return (
    <div className="lista-pedidos-container">
      <div className="lista-pedidos-header">Mis Pedidos</div>

      <div className="lista-pedidos-filtro">
        <button className={filtro === "PENDIENTE" ? "activo" : ""} onClick={() => setFiltro("PENDIENTE")}>
          Pendientes
          <div className="filtro-texto-sombra"></div>
        </button>
        <button className={filtro === "ENTREGADO" ? "activo" : ""} onClick={() => setFiltro("ENTREGADO")}>
          Completados
          <div className="filtro-texto-sombra"></div>
        </button>
        <button className={filtro === "CANCELADO" ? "activo" : ""} onClick={() => setFiltro("CANCELADO")}>
          Cancelados
          <div className="filtro-texto-sombra"></div>
        </button>
      </div>

      <div className="lista-pedidos-lista">
        {loading && <p>Cargando pedidos...</p>}
        {error && <p>{error}</p>}

        {!loading &&
          pedidos.length > 0 &&
          pedidos
            .filter((p) => p.estado === filtro)
            .map((p) => (
              <PedidoCard
                key={`${p.id}-${p.nombreLocal}`}
                pedido={p}
                onCancel={() => cancelar(p)}
                onClick={() => navigate(`/Pedidos/${p.id}/${p.nombreLocal}`)}
              />
            ))}

        {!loading && pedidos.length === 0 && <p>No hay pedidos en esta categoría</p>}
      </div>
    </div>
  )
}
