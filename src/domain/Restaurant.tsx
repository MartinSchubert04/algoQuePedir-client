export interface restaurant {
  id: number
  nombreLocal: string
  imagen: string
  distancia: number
  promedio: number
}

export interface RestaurantProfileDTO{
    nombreLocal: string
    imgPath: string
    distancia: number
    promedio: number
    tipoDelivery: string
}

export interface CalificacionDTO {
  localId ?: number| null;
  puntaje ?: number| null;
}

export interface CalificacionesResponse {
  id: number;
  nombreLocal: string;
  imagen: string;
  distancia: number;
  promedio: number;
}