import { toasts } from "@components/Toast/toastStore"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") {
    return error // Permite mostrar mensajes manuales
  }

  if (error.response) {
    const { status, data } = error.response
    if (status >= 400) {
      if (typeof data === "string" && data.length > 0) return data
      if (typeof data === "object" && data !== null && data.message) return data.message
      return `Error ${status}: El servidor devolvió una respuesta inesperada.`
    }
  }

  if (error.code === "ERR_NETWORK") {
    return "Error de conexión con el servidor."
  } else if (error.message) {
    return error.message
  } else {
    return "Error desconocido"
  }
}

export const showError = (error: unknown) => {
  // eslint-disable-next-line no-console
  console.info(error)
  toasts.push(`${getErrorMessage(error)}`, { type: "error" })
}

export const showSuccess = (message: string) => {
  toasts.push(`${message}`, { type: "success" })
}
