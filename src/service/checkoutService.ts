import type { PedidoCheckoutDTO } from "@domain/Pedido";
import axios from "axios";
import { API_URL } from "./config";
import type { LocalCheckoutDTO } from "@domain/Local";

class CheckoutService{
    async checkoutPedido(pedido: PedidoCheckoutDTO, idLocal: number, idUser: number){
        return await axios.post(`${API_URL}/confirmarPedido/${idLocal}/${idUser}`, pedido)
    }

    async getLocalData(idLocal: number, idUser: number): Promise<LocalCheckoutDTO> {
        const response = await axios.get(`${API_URL}/localCheckout/${idLocal}/${idUser}`)

        return {
            nombreLocal: response.data.nombreLocal,
            imgPath: response.data.imgPath,
            distancia: response.data.distancia,
            promedio: response.data.promedio,
            tipoDelivery: "Gratis",
            mediosDePago: response.data.mediosDePago
        }
    }

    async postResumenTemporal(localId: number, userId: number, pedido: PedidoCheckoutDTO) {
        return await axios.post(`${API_URL}/resumenTemporal/${localId}/${userId}`, pedido)
    }
}

export const checkoutService = new CheckoutService()