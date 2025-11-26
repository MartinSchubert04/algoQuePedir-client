export type Plato = {
    id?: number
    nombrePlato: string
    descripcion: string
    cantidad: number
    costo: number
    imagenPlato: string
}

export type PlatoDTO = {
    id: number,
    nombre: string,
    costoMercado: number,
    esDeOrigenAnimal: boolean,
    grupoAlimenticio: string
}