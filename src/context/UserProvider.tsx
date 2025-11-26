import { type ReactNode, useState } from "react"
import { Context } from "./UserContext"

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  const value = {
    userId,
    username,

    useLogin: (id: number, username: string) => {
      setUserId(id)
      setUsername(username)
    },

    logout: () => {
      setUserId(null)
    },
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
