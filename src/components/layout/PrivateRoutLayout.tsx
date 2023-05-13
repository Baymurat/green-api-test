import { useAuthContext } from "@context/AuthContextProvider"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const PrivateRoutLayout = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <main>
      <Outlet />
    </main>
  )
}

export default PrivateRoutLayout