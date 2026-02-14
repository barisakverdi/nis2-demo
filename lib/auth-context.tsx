"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"

// Auth context type
interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; needsOnboarding: boolean }>
  logout: () => void
  completeOnboarding: () => void
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
      const authToken = Cookies.get("auth_token")
      const isLoggedIn = authToken === "authenticated"
      const onboardingCompleted = Cookies.get("onboarding_completed") === "true"

      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)

      // Redirect to login if not authenticated and not already on login page
      if (!isLoggedIn && pathname !== "/login") {
        router.push("/login")
      }
      // If authenticated, only check if user is on wrong page
      else if (isLoggedIn && pathname !== "/login") {
        // Redirect to onboarding if not completed and not already there
        if (!onboardingCompleted && pathname !== "/onboarding") {
          router.push("/onboarding")
        }
        // Redirect to home if onboarding completed but still on onboarding page
        else if (onboardingCompleted && pathname === "/onboarding") {
          router.push("/")
        }
      }
    }

    checkAuth()
  }, [pathname, router])

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; needsOnboarding: boolean }> => {
    // Mock authentication check
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Set authentication cookie (expires in 7 days)
      Cookies.set("auth_token", "authenticated", { expires: 7 })
      Cookies.set("user_email", email, { expires: 7 })
      setIsAuthenticated(true)

      // Check if onboarding is completed
      const onboardingCompleted = Cookies.get("onboarding_completed") === "true"

      return { success: true, needsOnboarding: !onboardingCompleted }
    }

    return { success: false, needsOnboarding: false }
  }

  // Logout function
  const logout = () => {
    Cookies.remove("auth_token")
    Cookies.remove("user_email")
    Cookies.remove("onboarding_completed")
    setIsAuthenticated(false)
    router.push("/login")
  }

  // Complete onboarding function
  const completeOnboarding = () => {
    Cookies.set("onboarding_completed", "true", { expires: 7 })
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        completeOnboarding,
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
