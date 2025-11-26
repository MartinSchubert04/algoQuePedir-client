import { useParams, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { Button } from "@mui/material"
import "./Local.css"
import { useOnInit, useModalOpen } from "@hooks/hooks"
import { localService } from "@service/Local.service"
import { showError } from "@utils/errorHandling"
import { Local } from "@domain/Local"
import { Header } from "@components/Header/Header.component"
import { FloatingCartButton } from "@components/Buttons/FloatingButton"
import { MenuGrid } from "@components/Grid/Menu/MenuGrid.component"
import { star } from "@assets/index"
import { InboxGrid } from "@components/Grid/Inbox/InboxGrid.component"
import { Context } from "@context/PedidoContext"

export const LocalPage = () => {
  const id = Number(useParams<{ id: string }>().id)
  const [local, setLocal] = useState(new Local())
  const [gridSelected, setGridSelected] = useState("menu")

  const modalOpen = useModalOpen()
  const promedio = Number(local.promedioPuntajes)
  const pedido = useContext(Context)!

  useOnInit(async () => {
    if (id !== undefined) {
      try {
        const localFetch = await localService.getLocal(id)
        setLocal(localFetch)

        if (pedido.localId !== id) {
          pedido.clearPedido() // se borra el pedido al entrar a otro local
          pedido.setLocalId(id)
        }
      } catch (e) {
        showError(e)
      }
    }
  })

  return (
    <main className="local-detail-body" data-testid="local-test">
      <Header title={local.nombreLocal} />
      <img className="local-detalle-img" src={local.imgURL} alt={local.nombreLocal} />
      <div className="local-info">
        <p className="local-name">{local.nombreLocal}</p>
        <p className="local-review">
          {promedio % 1 == 0 ? promedio.toFixed(0) : promedio.toFixed(1)}
          <img src={star} className="star-img" alt={local.nombreLocal} />
          {" (" + local.cantidadPuntajes + "+ reviews) · " + local.cantidadPedidos + " pedidos"}
        </p>
      </div>
      <div className="grid-selector">
        <div className="local-button-container">
          <Button variant="text" onClick={() => setGridSelected("menu")} sx={{ textTransform: "none", padding: "0", color: "var(--color-text-red)" }}>
            Menú
          </Button>
        </div>
        <div className="local-button-container">
          <Button
            variant="text"
            onClick={() => setGridSelected("inbox")}
            sx={{ textTransform: "none", padding: "0", color: "var(--color-text-red)" }}
          >
            Reseñas
          </Button>
        </div>
      </div>
      {gridSelected === "menu" ? <MenuGrid menu={local.menu} /> : <InboxGrid inbox={local.inbox} />}

      {pedido.platos.length > 0 && !modalOpen && <FloatingCartButton count={pedido.platos.length} path="/checkout" />}
    </main>
  )
}
