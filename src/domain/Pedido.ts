import type { EstadoPedido, MedioDePago } from "./EstadoPedido";
import type { Plato } from "./Plato";

export interface PlatoDTO {
    id: number;
    nombrePlato: string;
    cantidad: number;
    costo: number;
    imagenPlato: string;
}

export interface PedidoDTO {
    id: number;
    estado: EstadoPedido;
    nombreLocal: string;
    valoracion: number;
    distanciaALocal: number;
    fecha: string;
    fotoLocal: string;
    items: number;
    total: number;
    metodoPago: MedioDePago;
    platos: PlatoDTO[];
    costeEnvio: number;
    adicionalPorMedio: number;
}

export interface PedidoCheckoutDTO {
    id: number
    estado: EstadoPedido;
    nombreLocal: string;
    valoracion: number;
    distanciaALocal: number;
    fecha: string;
    fotoLocal: string;
    items: number;
    total: number;
    metodoPago: MedioDePago;
    platos: Plato[];
    costeEnvio: number;
    adicionalPorMedio: number;
}