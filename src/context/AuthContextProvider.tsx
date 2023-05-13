import { FC, PropsWithChildren, createContext, useContext, useState } from "react"

interface User {
  name: string
}

interface IAuthContext {
  user: User | null
  setUser: (data: any) => void
}

const AuthContext = createContext<IAuthContext | null>(null)
const userFromLocalStorage = JSON.parse(localStorage.getItem('ws-user') ?? 'null')

export const AuthContextProvier: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(userFromLocalStorage)
  const setUser = (data: any) => {
    localStorage.setItem('ws-user', data)
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
