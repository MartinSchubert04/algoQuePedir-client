import type { RestaurantProfileDTO } from "./Restaurant"

export interface ProfileDTO {
    id: number
    nombre: string
    apellido: string
    direccion: string
    altura: number
    latitud: number
    longitud: number
    condicion: PreferenceDTO
    ingredientesEvitar: string[]
    ingredientesPreferidos: string[]
    restosFavoritos: RestaurantProfileDTO[]
    palabrasMarketing: string[],
    distanciaMax: number
}

export interface PreferenceDTO {
    tipo: string
    condiciones?: PreferenceDTO[]
}