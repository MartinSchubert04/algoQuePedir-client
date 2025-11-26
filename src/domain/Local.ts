import type { MedioDePago } from "./EstadoPedido" 
import type { Plato } from "./Plato"
import { Inbox } from "./Inbox"
import { imgNotFound } from "@assets/index"

export type LocalSearch = {
    id?: number
    nombreLocal: string
    calle: string
    imgURL: string
    altura: string
}

type LocalJSON = {
    id?: number
    nombreLocal: string
    imgURL: string
    calle: string
    latitud: number
    longitud: number
    altura: number
    mediosDePago: MedioDePago[]
    menu: Plato[]
    puntaje: number[]
    inbox: Inbox
}

export class Local {
    id?: number
    nombreLocal: string
    imgURL: string
    calle: string
    altura: number
    mediosDePago: MedioDePago[]
    menu: Plato[]
    promedioPuntajes: number
    cantidadPuntajes: number
    cantidadPedidos: number
    inbox: Inbox

    constructor(
        id?: number,
        nombreLocal: string = "",
        imgURL: string = "",
        calle: string = "",
        altura: number = 0,
        mediosDePago: MedioDePago[] = [],
        menu: Plato[] = [],
        promedioPuntajes: number = 0,
        cantidadPuntajes: number = 0,
        cantidadPedidos: number = 0,
        inbox?: Inbox,
    ) {
        this.id = id
        this.nombreLocal = nombreLocal
        this.imgURL = imgURL
        this.calle = calle
        this.altura = altura
        this.mediosDePago = mediosDePago
        this.menu = menu
        this.promedioPuntajes = promedioPuntajes
        this.cantidadPedidos = cantidadPedidos
        this.cantidadPuntajes = cantidadPuntajes
        this.inbox = inbox ?? new Inbox()
    }

    static fromJson(localJson: LocalJSON): Local {
        const normalized = { ...localJson }
        if (!normalized.imgURL) normalized.imgURL = imgNotFound
        return Object.assign(new Local(), localJson)
    }
}

export interface LocalCheckoutDTO {
    nombreLocal: string,
    imgPath: string,
    distancia: number,
    promedio: number,
    tipoDelivery: string,
    mediosDePago: MedioDePago[]
}