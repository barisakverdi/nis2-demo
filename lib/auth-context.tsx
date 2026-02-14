"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// Auth context type
interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user credentials
const MOCK_USER = {
  email: "demo@nis2.com",
  password: "Demo123!"
}

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("auth_token")
      const isLoggedIn = authToken === "authenticated"
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)

      // Redirect to login if not authenticated and not already on login page
      if (!isLoggedIn && pathname !== "/login") {
        router.push("/login")
      }
      // Redirect to home if already authenticated and on login page
      else if (isLoggedIn && pathname === "/login") {
        router.push("/")
      }
    }

    checkAuth()
  }, [pathname, router])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication check
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Set authentication
      localStorage.setItem("auth_token", "authenticated")
      localStorage.setItem("user_email", email)
      setIsAuthenticated(true)

      return true
    }

    return false
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_email")
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
