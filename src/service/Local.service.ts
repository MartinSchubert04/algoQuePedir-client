import { API_URL } from "./config"
import axios from "axios"
import { Local } from "@domain/Local"
import type { RestaurantProfileDTO } from "@domain/Restaurant"
class LocalService {
    async getLocal(id: number) {
        const res = await axios.get(`${API_URL}/local/${id}`)
        return Local.fromJson(res.data)
    }

    async getAllLocales(userID: number): Promise<RestaurantProfileDTO[]>{
        const res = await axios.get(`${API_URL}/localesPerfil/${userID}`)
        return res.data
    }

    async getLocalPerfil(localID: number, userID: number): Promise<RestaurantProfileDTO>{
        const res: RestaurantProfileDTO = await axios.get(`${API_URL}/localCheckout/${localID}/${userID}`)
        return res
    }
}

export const localService = new LocalService()