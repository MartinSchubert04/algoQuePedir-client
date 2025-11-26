// src/components/Toast/ToastContainer.tsx
import { useEffect, useState } from "react"
import { toasts, type Toast } from "./toastStore"
import "./Toast.css"

export function ToastContainer() {
  const [list, setList] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = toasts.subscribe(setList)
    return () => unsubscribe()
  }, [])

  return (
    <div className="toast-container" data-testid="toast">
      {list.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || "info"}`}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
