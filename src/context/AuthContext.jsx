import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      console.log('Login attempt:', { email, password })
      
      // Mock authentication - accepts any email with password "password123"
      if (password === 'password123') {
        const role = email.split('@')[0].split('.')[0]
        const name = email.split('@')[0].replace('.', ' ')
        
        const mockUser = {
          id: 1,
          name: name,
          email: email,
          role: role,
          district: 'Nashik District',
          permissions: ['view_dashboard', 'manage_plots']
        }
        
        console.log('Setting user:', mockUser)
        setUser(mockUser)
        localStorage.setItem('authToken', 'mock-jwt-token')
        localStorage.setItem('userData', JSON.stringify(mockUser))
        
        return { success: true }
      } else {
        return { success: false, error: 'Invalid password. Use: password123' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    console.log('Logging out...')
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}