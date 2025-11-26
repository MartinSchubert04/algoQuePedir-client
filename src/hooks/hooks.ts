import { useEffect, useState } from "react"
import { subscribeModal, getModalOpen } from "@utils/modalEvents"

export const useOnInit = (initialCallBack: () => void) => {
  useEffect(() => {
    initialCallBack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useModalOpen() {
  const [open, setOpen] = useState(getModalOpen())

  useEffect(() => {
    const unsub = subscribeModal(setOpen)
    return () => unsub()
  }, [])

  return open
}
