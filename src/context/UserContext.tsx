import { createContext } from "react"

export type UserContext = {
  userId: number | null
  username: string | null
  useLogin: (id: number, username: string) => void
  logout: () => void
}

export const Context = createContext<UserContext | null>(null)
