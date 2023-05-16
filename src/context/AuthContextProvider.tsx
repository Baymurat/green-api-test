import { type WSUser } from "@custom-types/types"
import { FC, PropsWithChildren, createContext, useContext, useState } from "react"

interface IAuthContext {
  user: WSUser | null
  setUser: (data: any) => void
}

const AuthContext = createContext<IAuthContext | null>(null)
const userFromLocalStorage = JSON.parse(localStorage.getItem('ws-user') ?? 'null')

export const AuthContextProvier: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<WSUser | null>(userFromLocalStorage)
  const setUser = (data: WSUser) => {
    localStorage.setItem('ws-user', JSON.stringify(data))
    setUserState(data)
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error(
      'useAuthContext has to be used within <AuthContext.Provider>'
    )
  }

  return context
}
