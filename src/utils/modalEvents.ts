type Listener = (open: boolean) => void

let modalOpen = false
const listeners: Listener[] = []

export function setModalOpen(open: boolean) {
  modalOpen = open
  listeners.forEach((fn) => fn(open))
}

export function subscribeModal(fn: Listener) {
  listeners.push(fn)
  return () => {
    const i = listeners.indexOf(fn)
    if (i !== -1) listeners.splice(i, 1)
  }
}

export function getModalOpen() {
  return modalOpen
}
