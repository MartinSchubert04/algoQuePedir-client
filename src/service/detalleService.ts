import axios from 'axios'
import type { PedidoDTO } from '../domain/Pedido'
import type { EstadoPedido } from '../domain/EstadoPedido'
import { API_URL } from './config'

class DetalleService {

  async getAllPedidos(username: string, estado?: EstadoPedido): Promise<PedidoDTO[]> {
    const resp = await axios.get(`${API_URL}/user/pedidos`, {
      params: {
        user: username,
        estado
      }
    })
    return resp.data
  }

  async getPedidoById(user: string, id: number, nombreLocal: string): Promise<PedidoDTO | null> {
    const response = await axios.get(`${API_URL}/user/pedidos/${id}/${nombreLocal}`, {
      params: { user, nombreLocal }
    })
    return response.data
  }

async cancelarPedido(username: string, pedido: PedidoDTO) {
  return axios.put(`${API_URL}/user/pedidos/cancelar`, pedido, {
    params: { user: username }
  })
}

}

export const detalleService = new DetalleService()
