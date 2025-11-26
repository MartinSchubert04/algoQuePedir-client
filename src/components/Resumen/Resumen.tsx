import "./resumen.css"
import type { MedioDePago } from "@domain/EstadoPedido";

type ResumenProps = {
    subtotal: number,
    recargo: number,
    tarifa: number,
    total: number,
    metodoPago?: string,
    metodoPagoEditable?: boolean,
    onMetodoPagoChange?: (metodo: MedioDePago) => void,
    mediosDePagoDisponibles?: MedioDePago[] 
}

//30 y 38 modificadas: se estaba calculando mal el recargo y el total
export const Resumen = ({ subtotal, recargo, tarifa, metodoPago, metodoPagoEditable, onMetodoPagoChange, total, mediosDePagoDisponibles = [] }: ResumenProps) => {
    return (
        <>
            <h3>Resumen</h3>
            <section className="resumen-data-container">
                <div className="resumen-row">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="resumen-row">
                    <p>Incremento por tipo de pago</p>
                    <p>${((subtotal + tarifa) * (recargo - 1)).toFixed(2)}</p>
                </div>
                <div className="resumen-row">
                    <p>Tarifa de entrega</p>
                    <p>${tarifa}</p>
                </div>
                <div className="resumen-row total-resumen">
                    <p>Total</p>
                    <p>${total}</p> 
                </div>
                {(metodoPago && !metodoPagoEditable) && (
                    <div className="resumen-row total-resumen">
                        <p>Método de pago:</p>
                        <p>{metodoPago}</p>
                    </div>
                )}
                {
                    metodoPagoEditable && (
                        <div className="resumen-row total-resumen">
                            <p>Método de pago:</p>
                            <select
                                className="metodo-select"
                                value={metodoPago}
                                onChange={(e) => onMetodoPagoChange?.(e.target.value as MedioDePago)}
                            >
                                {mediosDePagoDisponibles.map(opcion => (
                                    <option key={opcion} value={opcion}>{opcion}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
            </section>
        </>
    )
}