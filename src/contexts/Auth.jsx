import { useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'
import { Badge } from 'dracula-ui'
import LoginForm from '../components/LoginForm'

let AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  let [loading, setLoading] = useState(true)
  let [user, setUser] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      axios.get('http://localhost:3333/validate/' + token)
        .then(({ data }) => {
          console.log(data)
          if (data.user) setUser(data.user)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
    }
    setLoading(false)
  }, [setLoading, setUser])

  if (loading) return <Badge color="animated">Loading</Badge>
  if (!user) return <LoginForm />

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useUser = () => useContext(AuthContext)