export class Mensaje {
  fecha: string
  asunto: string
  contenido: string
  leido: boolean

  constructor(fecha: string = "", asunto: string = "", contenido: string = "", leido: boolean = false) {
    this.fecha = fecha
    this.asunto = asunto
    this.contenido = contenido
    this.leido = leido
  }
}

export class Inbox {
  mensajes: Mensaje[]

  constructor(mensajes: Mensaje[] = []) {
    this.mensajes = mensajes
  }

  recibirMensaje(mensaje: Mensaje) {
    this.mensajes.push(mensaje)
  }

  marcarLeido(posicion: number) {
    if (this.mensajes[posicion]) {
      this.mensajes[posicion].leido = true
    }
  }

  static fromJson(json: any): Inbox {
    const mensajes = json.mensajes?.map((m: any) => new Mensaje(m.fecha, m.asunto, m.contenido, m.leido)) ?? []
    return new Inbox(mensajes)
  }
}
