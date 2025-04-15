"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
    setLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const signUp = async (name, email, password) => {
    // In a real app, you would make an API call here
    // For this demo, we'll simulate a successful signup
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: Date.now().toString(), name, email }
        setUser(newUser)
        resolve(newUser)
      }, 1000)
    })
  }

  const signIn = async (email, password) => {
    // In a real app, you would make an API call here
    // For this demo, we'll simulate a successful login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (email && password) {
          // Extract name from email for demo purposes
          const name = email.split("@")[0]
          const user = { id: Date.now().toString(), name, email }
          setUser(user)
          resolve(user)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
