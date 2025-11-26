import axios from 'axios'
import type { CalificacionesResponse,CalificacionDTO } from '@domain/Restaurant'

const REST_SERVER_URL = 'http://localhost:9000'

class RestaurantService {

    async getLocalesCalificar(userId: number): Promise<CalificacionesResponse[]> {
        const response = await axios.get(`${REST_SERVER_URL}/calificaciones/${userId}`);
        return response.data;
    }

    async calificarLocal(calificacion: CalificacionDTO): Promise<void> {
        await axios.patch(`${REST_SERVER_URL}/calificaciones`, calificacion);
    }
}

export const restaurantService = new RestaurantService()
