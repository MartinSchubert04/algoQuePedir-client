export type Toast = {
  id: number
  message: string
  type?: "error" | "info" | "success"
  duration?: number
}

type ToastSubscriber = (toasts: Toast[]) => void

class ToastStore {
  private toasts: Toast[] = []
  private subscribers: ToastSubscriber[] = []
  private counter = 0

  subscribe(callback: ToastSubscriber) {
    this.subscribers.push(callback)
    callback(this.toasts)
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback)
    }
  }

  private notify() {
    for (const sub of this.subscribers) sub(this.toasts)
  }

  push(message: string, opts: Partial<Omit<Toast, "id">> = {}) {
    const id = ++this.counter
    const toast: Toast = { id, message, type: "info", duration: 3000, ...opts }
    this.toasts = [...this.toasts, toast]
    this.notify()

    setTimeout(() => this.remove(id), toast.duration)
    return id
  }

  remove(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id)
    this.notify()
  }
}

export const toasts = new ToastStore()
