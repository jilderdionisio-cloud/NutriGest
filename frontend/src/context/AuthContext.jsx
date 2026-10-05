import { useMemo, useState } from 'react'
import AuthContext from './authContext'
import { getStoredUser, normalizeUserData, removeStoredUser, saveStoredUser } from './authUtils'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const value = useMemo(() => {
    const login = (userData) => {
      const normalizedUser = normalizeUserData(userData)

      setUser(normalizedUser)

      if (normalizedUser) {
        saveStoredUser(normalizedUser)
      }
    }

    const logout = () => {
      setUser(null)
      removeStoredUser()
    }

    const updateUser = (userData) => {
      setUser((currentUser) => {
        const normalizedUser = normalizeUserData({
          ...(currentUser ?? {}),
          ...(userData ?? {}),
        })

        if (normalizedUser) {
          saveStoredUser(normalizedUser)
        }

        return normalizedUser
      })
    }

    return {
      user,
      login,
      logout,
      updateUser,
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
