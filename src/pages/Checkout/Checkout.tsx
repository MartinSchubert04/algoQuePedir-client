import { Article } from "../../components/Article/Article"
import { Restaurant } from "../../components/Restaurant/Restaurant"
import { Header } from "../../components/Header/Header.component"
import { Resumen } from "@components/Resumen/Resumen"
import { type PedidoCheckoutDTO } from "@domain/Pedido"
import "./checkout.css"
import React, { useContext, useEffect, useState } from "react"
import type { MedioDePago } from "@domain/EstadoPedido"
import { checkoutService } from "@service/checkoutService"
import { showSuccess, showError } from "@utils/errorHandling"
import { useNavigate } from "react-router-dom"
import { Context as PedidoContext } from "@context/PedidoContext"
import { Context as UserContext } from "@context/UserContext"

const getPedidoData = async (idLocal: number, idUser: number) => {
    return await checkoutService.getLocalData(idLocal, idUser)
}

export const Checkout = () => {
    const navigate = useNavigate()
    const pedidoContext = useContext(PedidoContext)
    const userContext = useContext(UserContext)

    if (!pedidoContext) {
        showError("No se encontro ningun pedido guardado")
        throw new Error("No se encontro ningun pedido")
    }
    if (!userContext) {
        showError("No se encontro el usuario, inicie sesion")
        throw new Error("No se encontro el usuario")
    }

    const [pedido, setPedido] = useState<PedidoCheckoutDTO>({
        id: 999,
        estado: "PENDIENTE",
        nombreLocal: "",
        valoracion: 0,
        distanciaALocal: 0,
        fecha: "",
        fotoLocal: "",
        items: 0,
        total: 0,
        metodoPago: "TRANSFERENCIA",
        platos: [],
        costeEnvio: 0,
        adicionalPorMedio: 0
    })

    const [resumenBackend, setResumenBackend] = useState<any | null>(null)
    const [mediosDePagoDisponibles, setMediosDePagoDisponibles] = useState<MedioDePago[]>([])

    useEffect(() => {
        const today = new Date()
        const loadPedidoData = async () => {
            const data = await getPedidoData(pedidoContext.localId!!, userContext.userId!!)
            setMediosDePagoDisponibles(data.mediosDePago)
            setPedido({
                id: 999,
                estado: "PENDIENTE",
                nombreLocal: data.nombreLocal,
                valoracion: data.promedio,
                distanciaALocal: Number(data.distancia.toFixed(2)),
                fecha: `${today.getDay()}/${today.getMonth() + 1}/${today.getFullYear()}`,
                fotoLocal: data.imgPath,
                items: pedidoContext.platos.length,
                total: pedidoContext.platos.reduce((amt, plato) => amt + plato.costo, 0),
                metodoPago: data.mediosDePago.length === 1 
                ? data.mediosDePago[0]       
                : "TRANSFERENCIA", 
                platos: pedidoContext.platos,
                costeEnvio: 20,
                adicionalPorMedio: 20
            })
        }
        loadPedidoData()
    }, [])

    //aca se hace el post del resumen temporal - mariano
    checkoutService.postResumenTemporal(
    pedidoContext.localId!!,
    userContext.userId!!,
    pedido       
)

useEffect(() => {
    if (!userContext.userId) return;

    const tienePlatos = pedido.platos.length > 0;
    if (!tienePlatos) {
        setResumenBackend({ recargo: 0, costeEnvio: 0, total: 0 });
        return;
    }

    checkoutService.postResumenTemporal(
        pedidoContext.localId!!,
        userContext.userId!!,
        pedido
    )
    .then(response => setResumenBackend(response.data))
    .catch(showError);

}, [pedido.metodoPago, pedido.platos]);

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await checkoutService.checkoutPedido(pedido, pedidoContext.localId!!, userContext.userId!!)
            showSuccess("Pedido confirmado!")
            pedidoContext.clearPedido()
            navigate("/Pedidos")
        } catch (error) {
            showError(error)
        }
    }

    const removePlato = (id: number) => {
        const nuevosPlatos = pedido.platos.filter(p => p.id !== id)
        const nuevosItems = nuevosPlatos.length
        const nuevoSubtotal = nuevosPlatos.reduce((acc, p) => acc + p.costo * p.cantidad, 0)
        const nuevoTotal = nuevoSubtotal + pedido.costeEnvio + pedido.adicionalPorMedio

        setPedido({
            ...pedido,
            platos: nuevosPlatos,
            items: nuevosItems,
            total: nuevoTotal
        })
    }

    const updateMetodoPago = (nuevoMetodo: MedioDePago) => {
        setPedido({
            ...pedido,
            metodoPago: nuevoMetodo
        })
    }

    const handleLimpiarCarrito = (e: React.MouseEvent) => {
        e.preventDefault()
        pedidoContext?.clearPedido()
        navigate("/Home")
    }

    const subtotal = pedido.platos.reduce((acc, p) => acc + p.costo * p.cantidad, 0)
    const noHayPlatos = pedidoContext.platos.length === 0;

    return (
        <div className="checkout-container-pedido">
            <div className="pedido-title-button-pedido">
                <Header title="Tu pedido" />
            </div>

            <div className="page-content-wrapper">
                <div className="pedido-container">
                    <h3>Restaurante</h3>
                    <Restaurant
                        imgPath={pedido.fotoLocal}
                        name={pedido.nombreLocal}
                        puntuacion={pedido.valoracion}
                        distance={pedido.distanciaALocal}
                        deliveryType="Pago"
                    />

                    <div className="checkout-divider"></div>

                    <section className="articles-container">
                        {pedido.platos.map(article => (
                            <Article
                                key={article.id}
                                id={article.id}
                                name={article.nombrePlato}
                                ammount={article.cantidad}
                                unit_price={article.costo}
                                hasDelete={true}
                                onDelete={() => removePlato(article.id!!)}
                            />
                        ))}
                    </section>
                </div>

                <div className="checkout-divider"></div>

                <div className="resumen-container">
                    <Resumen
                        subtotal={subtotal}
                        recargo={noHayPlatos ? 0.0 : resumenBackend?.recargo}
                        tarifa={noHayPlatos ? 0.0 : resumenBackend?.costeEnvio}
                        metodoPago={pedido.metodoPago}
                        metodoPagoEditable={true}
                        onMetodoPagoChange={updateMetodoPago}
                        total={noHayPlatos ? 0.0 : resumenBackend?.total}
                        mediosDePagoDisponibles={mediosDePagoDisponibles}
                    />
                </div>

                <div className="submit-buttons-container">
                    <button
                      className={`confirm-button ${pedido.platos.length === 0 ? "disabled" : ""}`}
                      onClick={handleSubmit}
                      disabled={pedido.platos.length === 0}
                    >
                      Confirmar pedido
                    </button>
                    <button className="clean-order" onClick={handleLimpiarCarrito}>Limpiar pedido</button>
                </div>
            </div>
        </div>
    )
}
