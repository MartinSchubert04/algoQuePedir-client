import axios from "axios";
import { API_URL } from "./config";
import type { PreferenceDTO, ProfileDTO } from "@domain/User";
import type { PlatoDTO } from "@domain/Plato";

class UserService {
    async updateProfile(id: number, updatedUser: ProfileDTO) {
        console.log(updatedUser)
        await axios.put(`${API_URL}/user/${id}`, updatedUser)
    }

    async getUserInfo(id: number): Promise<ProfileDTO> {
        let userData

        try {
            userData = await axios.get(`${API_URL}/userProfile/${id}`)
        }
        catch (e) {
            throw new Error(`Error: ${e}`)
        }

        return {
            id: id,
            nombre: userData.data.nombre,
            apellido: userData.data.apellido,
            direccion: userData.data.direccion,
            altura: userData.data.altura,
            latitud: userData.data.latitud,
            longitud: userData.data.longitud,
            condicion: userData.data.condicion,
            ingredientesEvitar: userData.data.ingredientesEvitar,
            ingredientesPreferidos: userData.data.ingredientesPreferidos,
            restosFavoritos: userData.data.restosFavoritos,
            palabrasMarketing: userData.data.palabrasMarketing,
            distanciaMax: userData.data.distanciaMax
        }
    }

    hasCondition(cond: string, condList?: PreferenceDTO): boolean {
        if (!condList) return false;

        if (condList.tipo === cond) return true;

        if (condList.condiciones) {
            return condList.condiciones.some(c => this.hasCondition(cond, c));
        }

        return false;
    }

    async getIngData(): Promise<string[]> {
        const response = await axios.get(`${API_URL}/ingrediente`);
        return response.data.map((ing: PlatoDTO) => ing.nombre);
    }
}

export const userService = new UserService